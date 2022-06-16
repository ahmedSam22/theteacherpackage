import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
 navigate='search';
 
 class_id=25
 sort=0;


sortedByName:any;
sortedByGender:any;

  @ViewChild('search')search!:ElementRef;
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService ,private elementRef: ElementRef ) {
  }

  ngOnInit(): void {
    // this.teacherservice.sortname=[];
    // this.teacherservice.sortgender=[];
    localStorage.removeItem("SortByName");
    localStorage.removeItem("SortByGender");
    this.select('students');
    this.teacherservice.getClassDetails(this.class_id).subscribe((res:any)=>{
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
   SortByName(){
    this.sort=1;
    this.teacherservice.sortStudents(this.class_id,this.sort,0,0).subscribe((res:any)=>{
    this.sortedByName=res['data'];
    
    this.teacherservice.sortname=this.sortedByName;
     ;
    let name='name'
    this.router.navigate(['../class-student',name],{ relativeTo: this.route})
     })
   }
   SortByGender(){
    this.sort=1;
    this.teacherservice.sortStudents(this.class_id,0,this.sort,0).subscribe((res:any)=>{
    this.sortedByGender=res['data'];
    this.teacherservice.sortgender=this.sortedByGender
    
      let gender='gender';
      this.router.navigate(['../class-student',gender],{ relativeTo: this.route})
    })
  }
  
  studentFilter(){
    this.searchResult=this.search.nativeElement.value;
    console.log("Search" ,this.searchResult)
    if(this.searchResult!=''){
      this.router.navigate(['../class-student',this.searchResult],{ relativeTo: this.route})
    }
    else {
      this.router.navigate(['../class-student',this.navigate],{ relativeTo: this.route})
    }
    

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
