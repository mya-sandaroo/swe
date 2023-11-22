import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'swe';
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate([''])
  }
}
