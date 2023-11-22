import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AppService, MeetingInfo } from '../app.service';

@Component({
  selector: 'app-meeting.form.component',
  templateUrl: './meeting.form.component.component.html',
  styleUrl: './meeting.form.component.component.scss'
})
export class MeetingFormComponentComponent {
  userList: string[] = [];
  constructor(public dialogRef: MatDialogRef<MeetingFormComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MeetingInfo,
    private readonly appService: AppService) {
    appService.getUsers().subscribe((res) => {
      alert(JSON.stringify(res))
      this.userList = res as string[];
    });
  }

  save(): void {
    this.data.createdBy = this.appService.loggedInUser.loginId;
    this.data.status = "In-progress"
    this.dialogRef.close({event:"Save",data:this.data});
  }

  close(): void {
    this.data.createdBy = this.appService.loggedInUser.loginId;
    if(!this.data.status) {
      this.data.status = "Draft"
    }
    this.dialogRef.close({event:"Close",data:this.data});
  }
}
