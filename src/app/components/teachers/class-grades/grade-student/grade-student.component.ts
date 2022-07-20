import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-grade-student',
  templateUrl: './grade-student.component.html',
  styleUrls: ['./grade-student.component.scss'],
})
export class GradeStudentComponent implements OnInit {
  id: any;
  subId:any;
  studentId:any;
  subitemDegree:any;
  grade_id = localStorage.getItem('grade_id');
  list: any[] = [];
  main: any;
  student:any;
  alart: any;
  title:any;
  degree: any;
  totalGrade:any[]=[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacher: TeacherService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    console.log(this.id);
    this.teacher.showMainItem(this.id, this.grade_id).subscribe((data: any) => {
      this.title=data.data.title
      this.main = data.data.grade_sub_items;
      this.student=data.data.grade_sub_items[0].students;
      console.log(data , this.main , this.title);
    });
  }
  getstudent(item:any){
console.log(item.id);
this.studentId= item.id;

  }
  getsubItem(item:any){
    console.log(item.id);
    this.subId= item.id;

      }
  insert(){
    let form={
      grade_sub_item_id:this.subId,
      course_id:localStorage.getItem("course_id"),
      grade_value:prompt("enter degree")
    }
    console.log(form);

    this.teacher.insertGradeforallStudent(form).subscribe(data=>{
      console.log(data);
this.reload();
    })

  }
  reload(){
    this.teacher.showMainItem(this.id, this.grade_id).subscribe((data: any) => {
      this.main = data.data.grade_sub_items;
      this.student=data.data.grade_sub_items[0].students;
      console.log(this.main);
    });
  }
  getDgree($event:any){
console.log($event.target.innerText);

let isnum = /^\d+$/.test($event.target.innerText );

if(!isnum && $event.target.innerText !=='-'){
  $event.target.innerHTML="-"
  this.degree= $event.target.innerText
  alert("must be number")
}else{
  this.degree= $event.target.innerText
}

  }
  save(){
    this.getsubItem;
   this.getstudent;
   this.getDgree
   console.log(this.subId , this.studentId ,this.degree );
      this.totalGrade.push({id:this.subId , students:[this.studentId ] , grades:[this.degree]})
      console.log(this.totalGrade);
  }
  savedegree(){
    console.log(this.totalGrade);
    for (let index = 0; index < this.totalGrade.length; index++) {
      let form={
        students_ids:this.totalGrade[index].students,
        course_id:localStorage.getItem("course_id"),
        grade_sub_item_id:this.totalGrade[index].id,
        grade_values:this.totalGrade[index].grades,
      }
      this.teacher.insertGradeforStudent(form).subscribe((data:any)=>{
        console.log(data);

      })

    }

  }
}
