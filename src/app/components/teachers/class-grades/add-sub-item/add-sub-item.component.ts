import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { TeacherService } from '../../teacher.service';
import { keyframes } from '@angular/animations';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-sub-item',
  templateUrl: './add-sub-item.component.html',
  styleUrls: ['./add-sub-item.component.scss']
})
export class AddSubItemComponent implements OnInit {
  AddSubForm!: FormGroup;
  GradesList:any[]= [];
getMainItem:any;
  course_id:any=localStorage.getItem("course_id");
  selectedDay: any;
alart:any;
  constructor( public dialogRef: MatDialogRef<DialogComponent>,
     private TeacherService:TeacherService  , private FormBuilder:FormBuilder , private router:Router) { }

  ngOnInit(): void {


    this.AddSubForm = this.FormBuilder.group({
      evaluation_item_name: ['' , Validators.required],

      evaluation_item_data_type: ['',Validators.required],

      first_option: ['',Validators.required],
      second_option: ['',Validators.required ],
    });

  }
  mainitemChanged(value:any) {
    this.TeacherService.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
      console.log(data);
      this.selectedDay = value;

    this.GradesList = data.data.grade_main_items;


    console.log(this.GradesList , this.GradesList[0].grade_id);
    localStorage.setItem("grade_id" , data.data.id)
    console.log(this.selectedDay , value);
  })
}
getmainitem(value:any) {
this.getMainItem=value;
  console.log(this.GradesList[0].grade_id , this.getMainItem.id);
}
onSubmit(form: any) {

  console.log(form);

 if(this.selectedDay==='1'){
  var forms = {
    ...this.AddSubForm.value ,
    grade_id:this.GradesList[0].grade_id,
    grade_main_item_id:this.getMainItem.id
  }
 }else{
  var forms = {
    ...this.AddSubForm.value ,
    grade_id:localStorage.getItem("grade_id"),
    // grade_main_item_id:this.getMainItem.id
  }
 }
  this.TeacherService.AddSubItem(forms).subscribe((data) => {
    console.log(data );
this.alart=data;
      if (this.alart.status === false) {
        console.log("data falsee");

        Swal.fire({  title: '',
        position: 'top-end',
        text: this.alart.errors[0],
        icon: 'error',
        confirmButtonColor: '#4AB673',

      });      } else {
        console.log("data true");
        this.onNoClick()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.router
        .navigate(['./../../../home/class-student/class-grade/grade-details'])
        .then(() => {
          this.getAllGrades()
        });
      }});

  // console.log( this.GradesList);



}
onNoClick(): void {
  this.dialogRef.close();

}
getAllGrades(){
  this.TeacherService.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
    console.log(data);

  } , err=>{
    console.log(err.message);

  })
}

}
