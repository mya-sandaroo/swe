import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AppService, MeetingInfo } from '../app.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; 
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-meeting.join.component',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './meeting.join.component.component.html',
  styleUrl: './meeting.join.component.component.scss'
})
export class MeetingJoinComponentComponent {
  location: string = "";
  constructor(public dialogRef: MatDialogRef<MeetingJoinComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MeetingInfo,
    private readonly appService: AppService) {

    }

  join() {
    this.data.status = "In-progress";
    var isFound = false;
    if(!this.data.suggestedLocations) {
      this.data.suggestedLocations = [];
    }
    this.data.suggestedLocations?.forEach(d => {
      if(d.suggestedBy === this.appService.loggedInUser.loginId) {
        isFound = true;
        d.location = this.location;
      }
    });
    if(!isFound) {
      this.data.suggestedLocations.push({location: this.location, suggestedBy: this.appService.loggedInUser.loginId});
    }
    this.dialogRef.close({event:"Join",data:this.data});
  }
}
