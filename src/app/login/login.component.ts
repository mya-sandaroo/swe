import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, SWEUser } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = "";

  constructor(private router: Router, private appService: AppService) {
    
  }
  onSubmit() {
    let user: SWEUser = {loginId: this.username, loginPassword: this.password};
    this.appService.login(user).subscribe(resp => {
      if(!resp) {
        this.loginError = "Incorrect username or password!"
      } else {
        this.loginError="";
        this.appService.loggedInUser.loginId = resp.loginId;
        this.appService.loggedInUser.loginName = resp.loginName;
        this.appService.loggedInUser.loginPassword = resp.loginPassword;
        this.router.navigate(['/home']);
      }
    });
  }
}
