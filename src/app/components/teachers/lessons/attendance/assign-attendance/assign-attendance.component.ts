import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { TeacherService } from '../../../teacher.service';

@Component({
  selector: 'app-assign-attendance',
  templateUrl: './assign-attendance.component.html',
  styleUrls: ['./assign-attendance.component.scss']
})
export class AssignAttendanceComponent implements OnInit {
  form!:FormGroup;
  allAttendanceCases:any;
  lessonId:any;
  constructor(private service:TeacherService,private formbuilder:FormBuilder, public dialogRef: MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.lessonId = localStorage.getItem('class_id') 

    this.form = this.formbuilder.group({
      attendance_case_id: ['', Validators.required],
      lesson_id: [localStorage.getItem("class_id"), Validators.required],
      student_id: [this.data.id, Validators.required],    
    })


    this.service.getAllAttendanceCases(this.lessonId).subscribe((res:any)=>{
      console.log(res);
      this.allAttendanceCases = res.data
      
      console.log("hhhhhhhhhhhhhhhhh" , this.allAttendanceCases);
    })
    
  }

}
