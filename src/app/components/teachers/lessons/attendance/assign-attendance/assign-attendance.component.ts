import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { TeacherService } from '../../../teacher.service';

@Component({
  selector: 'app-assign-attendance',
  templateUrl: './assign-attendance.component.html',
  styleUrls: ['./assign-attendance.component.scss']
})
export class AssignAttendanceComponent implements OnInit {

  constructor(private service:TeacherService, public dialogRef: MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {

    console.log("hhhhhhhhhhhhhhhhh" , this.data);
    
  }

}
