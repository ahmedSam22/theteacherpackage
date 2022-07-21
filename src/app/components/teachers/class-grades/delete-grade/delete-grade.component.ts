import { TeacherService } from './../../teacher.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-grade',
  templateUrl: './delete-grade.component.html',
  styleUrls: ['./delete-grade.component.scss']
})
export class DeleteGradeComponent implements OnInit {
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
  showTitles: boolean = false;
  constructor( private TeacherService:TeacherService , private router:Router) { }

  ngOnInit(): void {



    this.TeacherService.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
      console.log(data);

      this.GradesList = data.data.grade_main_items;
      this.outSiding=data.data.grade_sub_items_without_main_item;
      this.url=data.data.imagePath;
      this.titles_list=data.data.titles_list;

      console.log(this.GradesList , this.MainItems , this.imagePath , this.titles_list);
    })



//   selectImg(event:any){
//     const file = event.target.files[0];
// let reader= new FileReader();
// reader.readAsDataURL(file);
// reader.onload=(event:any)=>{
//  this.url= event.target.result;
//  console.log(this.url);

// }

  }

deleteTitles(item:any){
console.log(item);
const indexOfObject = this.titles_list.findIndex(object => {
  return object === item;
});

console.log(indexOfObject); // 👉️ 1

this.titles_list.splice(indexOfObject, 1);

console.log(this.titles_list);
let forms={
  titles:this.titles_list,
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

     });
        } else {

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
deleteSubItemWithoutmain(){
  this.outSiding=[];
  console.log(this.outSiding);

  let forms={
    grade_sub_items_without_main_item:this.outSiding,
    grade_id:localStorage.getItem("grade_id"),

    }
    console.log(forms);

    this.TeacherService.updateMianItem(forms).subscribe(data=>{
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

      }

    })
}
  save(){
  this.back()
  }
  back(){
    this.router.navigate(['../../../home/class-student/class-grade']);
  }

  // ///////////////////////////
  deleteImage(){

    if(confirm("are you sure?")){
      console.log(true);
this.TeacherService.deleteImageGrade(localStorage.getItem("grade_id")).subscribe((data:any) =>{
console.log(data);
if(data.status ==true){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
}else{
  Swal.fire({  title: '',
  position: 'top-end',
  text: this.alert.errors[0],
  icon: 'error',
  confirmButtonColor: '#4AB673',

});
}

})
    }else{
      console.log("no");

    }

  }
  deleteMainItem(item:any){
console.log(item.id);

    if(confirm("are you sure?")){
      console.log(true);
this.TeacherService.deleteMainItem(item).subscribe((data:any) =>{
console.log(data);
if(data.status ==true){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
  location.reload()
}else{
  Swal.fire({  title: '',
  position: 'top-end',
  text: data.errors[0],
  icon: 'error',
  confirmButtonColor: '#4AB673',

});
}

})
    }else{
      console.log("no");

    }

  }
}
