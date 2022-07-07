import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { TeacherService } from '../../../teacher.service';

@Component({
  selector: 'app-assign-all-attendance',
  templateUrl: './assign-all-attendance.component.html',
  styleUrls: ['./assign-all-attendance.component.scss']
})
export class AssignAllAttendanceComponent implements OnInit {
  form!:FormGroup;
  allAttendanceCases:any;
  lessonId:any;
  testcolor:any;
  constructor(private service:TeacherService,private formbuilder:FormBuilder, public dialogRef: MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data , "my data");
    
    this.lessonId = localStorage.getItem('class_id') 

    this.form = this.formbuilder.group({
      attendance_case_id: ["" , Validators.required],
      lesson_id: [Number(localStorage.getItem("class_id")), Validators.required],
    })


    this.service.getAllAttendanceCases(this.lessonId).subscribe((res:any)=>{
      console.log(res);
      this.allAttendanceCases = res.data
      
      console.log("hhhhhhhhhhhhhhhhh" , this.allAttendanceCases);
    })
    
  }
setColor(e:any){
 return this.testcolor = e
}

setatt(){
    this.form.controls["attendance_case_id"].setValue(this.testcolor)
    this.service.assignAllStudentAttendance(this.form.controls["lesson_id"].value,this.form.controls["attendance_case_id"].value).subscribe((res)=>{
      console.log(res);
      this.dialogRef.close();      
    })
   console.log(this.form.controls["attendance_case_id"].value);
   console.log(this.testcolor , "qqqqqqqqqqqqqqqqq");
  }
}
