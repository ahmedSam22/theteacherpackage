import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  classcode:any ; 
  studentnum:any;
  courses:any=[];
  classStudents:any=[];
 searchResult:any;


  @ViewChild('search')search!:ElementRef;
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService ,private elementRef: ElementRef ) {
  }

  ngOnInit(): void {
    this.select('students');
    this.teacherservice.getClassDetails(25).subscribe((res:any)=>{
    this.classStudents=res['data']
    console.log("class details" , this.classStudents)
    this.classname=this.classStudents.name ; 
  //  console.log(this.classname);
   this.classcode=this.classStudents.code ; 
  //  console.log(this.classcode);
   this.studentnum=this.classStudents.students_number;
  //  console.log(this.studentnum);
  this.courses=this.classStudents.courses;
    // console.log(this.courses);
   })
   

   
   }

  studentFilter(){
    this.searchResult=this.search.nativeElement.value;
    console.log("Search" ,this.searchResult)
    this.router.navigate(['../class-student',this.searchResult],{ relativeTo: this.route})
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
