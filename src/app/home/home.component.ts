import { ChangeDetectorRef, Component } from '@angular/core';
import { MeetingInfo, AppService, Suggestion } from '../app.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MeetingFormComponentComponent } from '../meeting.form.component/meeting.form.component.component';
import { MeetingJoinComponentComponent } from '../meeting.join.component/meeting.join.component.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loginUser = this.appService.loggedInUser.loginId;
  loginUserName = this.appService.loggedInUser.loginName;
  meetingInfos: MeetingInfo[] = [];
  displayedColumns: string[] = ['title', 'attendees', 'dateOfMeeting', 'details', 'selectedLocation', 'suggestedLocations', 'createdBy', 'status', 'actions'];

  
  constructor(private router: Router, private readonly appService: AppService, private dialog: MatDialog,private changeDetectorRefs: ChangeDetectorRef) {
    //this.meetingInfos = appService.getMeetingInfos();
    appService.getMeetingInfos(this.appService.loggedInUser).subscribe(
      data => {
        alert(JSON.stringify(data));
        this.meetingInfos = data as MeetingInfo[];
      }
      );
  }

  concatenating(list: String[]) {
    if (list) {
      return list.join(",");
    }
    return "";
  }

  suggestedInfoToString(suggestedInfos: Suggestion[]) {
    if (suggestedInfos) {
      return this.concatenating(suggestedInfos.map(info => info.location + " by " + info.suggestedBy));
    }
    return "";
  }

  openModal = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "70%";
    dialogConfig.height = "70%";
    dialogConfig.backdropClass = "popupBackdropClass";
    dialogConfig.data = this.appService.getNewMeetingInfo();
    const dialogRef = this.dialog.open(MeetingFormComponentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result.event==="Save") {
        this.appService.save(result.data).subscribe(res => {
          this.meetingInfos = res as MeetingInfo[];
        });
        
      } else {
        this.meetingInfos.push(result.data);
        this.meetingInfos = [...this.meetingInfos];
      }
      
    });
  }

  edit = (data: MeetingInfo) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "70%";
    dialogConfig.height = "70%";
    dialogConfig.backdropClass = "popupBackdropClass";
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(MeetingFormComponentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result.event==="Save") {
        this.appService.save(result.data).subscribe(res => {
          this.meetingInfos = res as MeetingInfo[];
        });
        
      } 
      
    });
  }

  delete = (data: MeetingInfo) => {
    const index = this.meetingInfos.findIndex(d=> d.id === data.id);
    this.appService.delete(data).subscribe(resp => {
      this.meetingInfos = resp as MeetingInfo[];
    })

  }

  join = (data: MeetingInfo) => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "50%";
    dialogConfig.height = "50%";
    dialogConfig.backdropClass = "popupBackdropClass";
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(MeetingJoinComponentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result.event==="Join") {
        this.appService.save(result.data).subscribe(res => {
          this.meetingInfos = res as MeetingInfo[];
        });
      } 
      
    });
  }

  close = (data: MeetingInfo) => {
    this.appService.close(data).subscribe(res => {
      this.meetingInfos = res as MeetingInfo[];
    });
    // const index = this.meetingInfos.findIndex(d=> d.id === data.id);
    // this.meetingInfos.forEach(o=> {
    //   if(o.id === data.id) {
    //     o.status = "Closed";
    //     this.appService.close(o)
    //   }
    // }); 
  }

  logout() {
    // Implement your logout logic here, e.g., clear user authentication, navigate to login page, etc.
    console.log('Logout clicked');
    this.router.navigate(['/login'])
  }
}
