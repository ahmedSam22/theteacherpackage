import { TeacherService } from './../../teacher.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-grade-image',
  templateUrl: './edit-grade-image.component.html',
  styleUrls: ['./edit-grade-image.component.scss']
})
export class EditGradeImageComponent implements OnInit {
  gradeForm!: FormGroup;
  url: any;
  base64Image:any ;
  file!: File;
  alert: any;
  titles_list:any[]=[];
  course_id:any=localStorage.getItem("course_id");
  imageChange:boolean=false
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private formbuilder:FormBuilder , private TeacherService:TeacherService) { }

  ngOnInit(): void {
    this.TeacherService.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
      console.log(data);
this.url=data.data.imagePath;
      this.titles_list=data.data.titles_list
      console.log(this.titles_list , this.url);

      setTimeout(()=>{
        for(let i = 0; i < this.titles_list.length;i++){
          this.getTitles.push( this.formbuilder.control(this.titles_list[i])  )
        }
       } , 1000)
    })

    this.gradeForm=this.formbuilder.group({
      titles : this.formbuilder.array([
        // this.formbuilder.control("")

      ]),
    })

  }
  get getTitles():any {
    return this.gradeForm.get("titles") as FormArray
  }

  addCourse() {
    this.getTitles.push(this.formbuilder.control(""))
console.log(this.gradeForm);

  }

select(event:any) {
    this.file=<File> event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
    this.base64Image = reader.result;
    this.url=  this.base64Image;
this.imageChange=true
console.log(this.url);
console.log(this.base64Image);
console.log(this.file);


    };

  }
  save(){
    // const fd:FormData =new FormData();
    // fd.append("image" ,this.file )
    // console.log(fd);
if(this.imageChange==true){
  console.log("yes");
  var  forms={
    ...this.gradeForm.value,
     image:this.file,
     grade_id:localStorage.getItem("grade_id")
     }
     this.TeacherService.updategrade(forms).subscribe(data=>{
      console.log(data);
      this.alert=data;
      if (this.alert.status === false) {
        Swal.fire({  title: '',
        position: 'top-end',
        text: this.alert.errors[0],
        icon: 'error',
        confirmButtonColor: '#4AB673',

      });      } else {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit()
      }

    })
}else{
  console.log("no");
  var  forms={
    ...this.gradeForm.value,

     grade_id:localStorage.getItem("grade_id")
     }
     this.TeacherService.updategradeMain(forms).subscribe(data=>{
      console.log(data);
      this.alert=data;
      if (this.alert.status === false) {
        Swal.fire({  title: '',
        position: 'top-end',
        text: this.alert.errors[0],
        icon: 'error',
        confirmButtonColor: '#4AB673',

      });      } else {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit()
      }

    })
}

    console.log(forms , this.gradeForm.value);


  }
  onNoClick(): void {
    this.dialogRef.close();

  }
}
