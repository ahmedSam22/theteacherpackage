import { TeacherService } from './../../teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-grades',
  templateUrl: './edit-grades.component.html',
  styleUrls: ['./edit-grades.component.scss']
})
export class EditGradesComponent implements OnInit {
  gradeForm!: FormGroup;
  url: any;
  base64Image:any ;
  file:File[]=[];
  alert: any;
  GradesList:any[]= [];
  outSiding:any[]=[];
MainItems:any[]=[];
imagePath:any;
titles_list:any[]=[];
  course_id:any=localStorage.getItem("course_id");


  constructor(private formbuilder:FormBuilder , private TeacherService:TeacherService , private router:Router) { }

  ngOnInit(): void {
    this.gradeForm=this.formbuilder.group({
      titles : this.formbuilder.array([
          //  this.formbuilder.control("")
         ]),

       })


    this.TeacherService.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
      console.log(data);

      this.GradesList = data.data.grade_main_items;
      this.outSiding=data.data.grade_sub_items_without_main_item;
      this.imagePath=data.data.imagePath;
      this.titles_list=data.data.titles_list
      console.log(this.GradesList , this.MainItems , this.imagePath , this.titles_list);
    })

   setTimeout(()=>{
    for(let i = 0; i < this.titles_list.length;i++){
      this.getTitles.push( this.formbuilder.control(this.titles_list[i])  )
    }
   } , 2000)
  }
  get getTitles():any {
    return this.gradeForm.get("titles") as FormArray

  }

  addCourse() {
    this.getTitles.push(this.formbuilder.control(""))
console.log(this.gradeForm);

  }
  selectImg(event:any){
    const file = event.target.files[0];
let reader= new FileReader();
reader.readAsDataURL(file);
reader.onload=(event:any)=>{
 this.url= event.target.result;
 console.log(this.url);

}

  }
select(event:any) {
    this.file= event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
    this.base64Image = reader.result;
    this.url= this.file[0];

    };

  }
  save(){
    let forms={
    ...this.gradeForm.value,
    // imagePath:this.url.name,
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
        this.back()
      }

    })
  }
  back(){
    this.router.navigate(['./../../../home/class-student/class-grade']);
  }
  item(itrm:any){
    console.log(itrm.id);
    this.router.navigate(['./../../../home/edit-grade', itrm.id]);

  }
}
