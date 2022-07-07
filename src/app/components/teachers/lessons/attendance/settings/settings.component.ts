import { EditAttendanceComponent } from './../edit-attendance/edit-attendance.component';
import Swal from 'sweetalert2'
import { AddAttendanceComponent } from './../add-attendance/add-attendance.component';
import { TeacherService } from './../../../teacher.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  allCaces: any = [];
  lessonId: any;
  recentCases: any;
  constructor(private service: TeacherService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.lessonId = localStorage.getItem('class_id');
this.getAllCaces()
    console.log(this.recentCases, 'all Cases Here');
  }
  getAllCaces(){
    this.service.getAllAttendanceCases(this.lessonId).subscribe((res: any) => {
      this.allCaces = res.data;
      console.log(this.allCaces, 'all Cases Here');
    });
  }
  deleteCase(id: any) {

    const dialogRef = this.dialog.open(DialogComponent, {
      data:{id:id, name:'Are you sure you want to delete ?',from:"attendance"},
      });
     dialogRef.afterClosed().subscribe(result => {

        //  console.log(result);
      });

  }

  editCase(obj:any) {
    const dialogRef = this.dialog.open(EditAttendanceComponent, {
      data:obj,
      });
     dialogRef.afterClosed().subscribe(_ => {
      this.getAllCaces()
        //  console.log(result);
      });
  }


  addAttendance(){
    const dialogRef = this.dialog.open(AddAttendanceComponent, {
     });
    dialogRef.afterClosed().subscribe(_ => {this.getAllCaces()});
  }
}
