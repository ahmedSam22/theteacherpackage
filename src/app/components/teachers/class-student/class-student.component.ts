import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../teacher.service';
@Component({
  selector: 'app-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.scss']
})
export class ClassStudentComponent implements OnInit {
  selected:any;
  classDetails:any;
  classname:any ;
  courses:any=[];
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService ,private elementRef: ElementRef ) {
  }

  ngOnInit(): void {
    this.select('students');
     this.teacherservice.getClassDetails(60).subscribe((res:any)=>{
      this.classDetails=res['data'];
      // console.log("Class Details", this.classDetails.courses )
      this.courses=this.classDetails.courses 
     })

 
  }
  type(num:any) {
     console.log("nummmm",num)
  }
  select(item:any) {
    this.selected = item;
    console.log("selllllected",this.selected)
     };
  isActive(item:any) {
  return this.selected === item;
  }
}
