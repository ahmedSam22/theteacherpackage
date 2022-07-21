import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-grade-details',
  templateUrl: './grade-details.component.html',
  styleUrls: ['./grade-details.component.scss']
})
export class GradeDetailsComponent implements OnInit {
  hideGrade!: boolean;
  showGarde!: boolean;
  showGradeList!: boolean;
  GradesList:any[]= [];
  outSiding:any[]=[];
MainItems:any[]=[];
  course_id:any=localStorage.getItem("course_id");
  main:any;
  constructor(private TeacherService: TeacherService , private router:Router) { }

  ngOnInit(): void {
    this.getAllGrades()

    console.log(this.GradesList);

      }
      item(itrm:any){
        console.log(itrm.id);
        this.router.navigate(['../../../home/class-student/grade-students', itrm.id]);
      }
      getAllGrades(){
        this.TeacherService.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
          this.main=data.data
          console.log(this.main);

        this.GradesList = data.data.grade_main_items;
        this.outSiding=data.data.grade_sub_items_without_main_item;
        console.log(this.GradesList , this.GradesList.length);

        localStorage.setItem("grade_id" , data.data.id)

        if(this.GradesList.length>0||this.outSiding.length>0){
          this.showGarde=false;
          this.hideGrade=true;

        }else{
          this.hideGrade=false;
          this.showGarde=true

        }
        } , err=>{
          console.log(err.message);

        })
      }
  }


