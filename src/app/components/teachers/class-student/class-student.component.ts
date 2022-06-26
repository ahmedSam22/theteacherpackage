import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
 
 class_id:any;
 sort=0;

 hideCoursesAndBags:boolean=true;
 showstudents:boolean =true; 
 showschedule:boolean=false;

sortedByName:any;
sortedByGender:any;

  @ViewChild('search')search!:ElementRef;
  constructor(public dialog: MatDialog ,private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService ,private elementRef: ElementRef ) {
  }

  ngOnInit(): void {
    let data = localStorage.getItem('class_id');
    console.log("dfdssad",data)
    this.class_id=data;
    // localStorage.removeItem("SortByName");
    // localStorage.removeItem("SortByGender");
    this.select('students');
    this.teacherservice.getClassDetails(+this.class_id).subscribe((res:any)=>{
    this.classStudents=res['data']
    console.log("class details" , this.classStudents)
    this.classname=this.classStudents.name ; 
  //  console.log(this.classname);
   this.classcode=this.classStudents.code ; 
  //  console.log(this.classcode);
   this.studentnum=this.classStudents.students_number;
  //  console.log(this.studentnum);
  this.courses=this.classStudents.courses;
     console.log("courses",this.courses);
   })
   

  //  this.teacherservice.getAllClasses().subscribe((res:any)=>{
  //   let allClasses;
  //   allClasses = res['data']
  //   console.log("classess" , allClasses)
  //   let courses;
  //   for(var i=0 ; i<=allClasses.length ; i++){
  //     courses=allClasses[i].courses
  //     console.log("courses" , courses)
  //       }
  //     })    
   }
   studentfunc(){
    this.showstudents=true; 
    this.showschedule= false;
   }
   schedulefunc(){
    this.showstudents=false; 
    this.showschedule= true;
   }
   SortByName(){
    this.sort=1;
    this.teacherservice.sortStudents(+this.class_id,this.sort,0,0).subscribe((res:any)=>{
    this.sortedByName=res['data'];
    
    this.teacherservice.sortname=this.sortedByName;
     ;
    let name='name'
    this.router.navigate(['../class-student',name],{ relativeTo: this.route})
     })
   }
   SortByGender(){
    this.sort=1;
    this.teacherservice.sortStudents(+this.class_id,0,this.sort,0).subscribe((res:any)=>{
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
    if(item!='students'){
      this.showschedule=false ;
      this.hideCoursesAndBags=false ;
    }
    else {
      // this.showschedule=true ;
      this.hideCoursesAndBags=true ;
    }
     };
  isActive(item:any) {
  return this.selected === item;
  }


  changeCourse(event:any){
    localStorage.setItem('course_id',event.target.value);
     
  }
 

  // addLesson(){
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     data:{id:id, name:'Are you sure you want to delete ?'},
  //     });
  //    dialogRef.afterClosed().subscribe(result => {
  //       //  console.log(result);
  //     });
  // }
}
