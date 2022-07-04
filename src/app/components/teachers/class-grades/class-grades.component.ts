import { TeacherService } from './../teacher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-grades',
  templateUrl: './class-grades.component.html',
  styleUrls: ['./class-grades.component.scss']
})
export class ClassGradesComponent implements OnInit {
  hideGrade!: boolean;
  showGarde!: boolean;
  GradesList:any[]= [];
MainItems:any[]=[];
  course_id:any=localStorage.getItem("course_id");
  constructor(private TeacherService: TeacherService) { }

  ngOnInit(): void {
this.TeacherService.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
  console.log(data);

this.GradesList = data.data.grade_main_items
console.log(this.GradesList);

localStorage.setItem("grade_id" , data.data.id)

if(this.GradesList){
  this.showGarde=false;
  this.hideGrade=true;
}else{
  this.hideGrade=false;
  this.showGarde=true
}
} , err=>{
  console.log(err);

})

console.log(this.GradesList);

  }


}
