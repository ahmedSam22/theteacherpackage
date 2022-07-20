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
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private formbuilder:FormBuilder , private TeacherService:TeacherService) { }

  ngOnInit(): void {
    this.TeacherService.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
      console.log(data);


      this.titles_list=data.data.titles_list
      console.log(this.titles_list);
    })

    this.gradeForm=this.formbuilder.group({
      titles : this.formbuilder.array([
        // this.formbuilder.control("")
      ]),
    })
    setTimeout(()=>{
      for(let i = 0; i < this.titles_list.length;i++){
        this.getTitles.push( this.formbuilder.control(this.titles_list[i])  )
      }
     } , 500)
  }
  get getTitles():any {
    return this.gradeForm.get("titles") as FormArray
  }

  addCourse() {
    this.getTitles.push(this.formbuilder.control(""))
console.log(this.gradeForm);

  }
  selectImg(event:any){
//     const file = event.target.files[0];
// let reader= new FileReader();
// reader.readAsDataURL(file);
// reader.onload=(event:any)=>{
//  this.url= event.target.result;
//  console.log(this.url);

// }
  }
select(event:any) {
    this.file=<File> event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
    this.base64Image = reader.result;
    this.url= this.file;
console.log(this.url);
console.log(this.base64Image);
console.log(this.file);


    };

  }
  save(){
    const fd:FormData =new FormData();
fd.append("uploads/grades/07-2022/" ,this.file )
console.log(fd);

    let forms={
    ...this.gradeForm.value,
    // image:fd,
    grade_id:localStorage.getItem("grade_id")
    }
    console.log(forms.image);

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
        this.onNoClick()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }

    })
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
}
