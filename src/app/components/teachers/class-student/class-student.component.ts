import { EditGradeImageComponent } from './../class-grades/edit-grade-image/edit-grade-image.component';
import { AddSubItemComponent } from './../class-grades/add-sub-item/add-sub-item.component';
import { AddMainItemComponent } from './../class-grades/add-main-item/add-main-item.component';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { PromptComponent } from '../../prompt/prompt.component';

import { TeacherService } from '../teacher.service';
@Component({
  selector: 'app-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.scss'],
})
export class ClassStudentComponent implements OnInit,OnChanges {
  selected: any;
  classDetails: any;
  classname: any;
  classcode: any;
  studentnum: any;
  courses: any = [];
  attendance = window.location.href.toString().split('/').slice(-1);
  classStudents: any = [];
  searchResult: any;
  navigate = 'search';
  GradesList:any[]= [];
  outSiding:any[]=[];
  show!: boolean;
  hide!: boolean;
  class_id: any;
  sort = 0;
  course_id:any=localStorage.getItem("course_id");
  hideCoursesAndBags: boolean = true;
  showstudents: boolean = true;
  showschedule: boolean = false;
  showBehavior: boolean = false;
  showGrade: boolean = false;
  sortedByName: any;
  sortedByGender: any;

  @ViewChild('search') search!: ElementRef;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private teacherservice: TeacherService,
    private elementRef: ElementRef
  ) {}
  ngOnChanges(){
  }
  ngOnInit(): void {
    this.teacherservice.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
      console.log(data);

    this.GradesList = data.data.grade_main_items;
    this.outSiding=data.data.grade_sub_items_without_main_item;
    console.log(this.GradesList , this.GradesList.length);

    localStorage.setItem("grade_id" , data.data.id)

    if(this.GradesList.length>0 || this.outSiding.length>0){
      this.show=false;
      this.hide=true;

    }else{
      this.hide=false;
      this.show=true

    }
    } , (err: { message: any; })=>{
      console.log(err.message);

    })
    // alert(this.attendance);
    let data = localStorage.getItem('class_id');

    console.log("dfdssad",data)
    this.class_id=data;
    // localStorage.removeItem("SortByName");
    // localStorage.removeItem("SortByGender");

    this.teacherservice
      .getClassDetails(+this.class_id)
      .subscribe((res: any) => {
        this.classStudents = res['data'];
        console.log('class details', this.classStudents);
        this.classname = this.classStudents.name;
        //  console.log(this.classname);
        this.classcode = this.classStudents.code;
        //  console.log(this.classcode);
        this.studentnum = this.classStudents.students_number;
        //  console.log(this.studentnum);
        this.courses = this.classStudents.courses;
        console.log('courses', this.courses);
           localStorage.setItem("course_id" , this.courses[0].id)

      });
    //  @HostListener('window:beforeunload') goToPage() {
    //   this.router.navigate(['/hello']);
    // }

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

   if(localStorage.getItem('showstudents')=='first'){
    this.showstudents=true;
    this.showschedule= false;
    this.showBehavior=false;
    this.showGrade=false;
    this.select('students');
   }
   else if(localStorage.getItem('showschedule')=='second') {
    this.showstudents=false;
    this.showschedule= true;
    this.showBehavior=false;
    this.showGrade=false;
    this.select('schedule');
   }
   else if (localStorage.getItem('showBehavior')=='third') {
    this.showstudents=false;
    this.showschedule= false;
    this.showGrade=false;
    this.showBehavior=true;
    this.select('behavior');
   }
   else if (localStorage.getItem('showGrade')=='forth') {
    this.showstudents=false;
    this.showschedule= false;
    this.showBehavior=false;
    this.showGrade=true
    this.select('grades');
   }
   else {
    this.select('students');
   }

   }

   behaviorAlert(){
    const dialogRef = this.dialog.open(PromptComponent, {
      data:{name:'The alert appears on the student whose negative behaviors exceed :' , promptplaceholder:'Number Of Behaviors', from:'behavior'},
    });
    dialogRef.afterClosed().subscribe(result => {
      location.reload()
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
   // });

   }

   studentfunc(){

    this.showstudents=true;
    this.showschedule= false;
    this.showBehavior=false;
    this.showGrade=false;
    localStorage.setItem('showstudents','first');
    localStorage.removeItem('showschedule');
    localStorage.removeItem('showBehavior');
    localStorage.removeItem('showGrade');
   }
   schedulefunc(){
    this.showstudents=false;
    this.showschedule= true;
    this.showBehavior=false;
    this.showGrade=false;
    localStorage.setItem('showschedule','second');
    localStorage.removeItem('showstudents');
    localStorage.removeItem('showBehavior');
    localStorage.removeItem('showGrade');
   }
   behaviorfunc(){
    this.showstudents=false;
    this.showschedule= false;
    this.showGrade=false;
    this.showBehavior=true;
    localStorage.setItem('showBehavior','third');
    localStorage.removeItem('showstudents');
    localStorage.removeItem('showschedule');
    localStorage.removeItem('showGrade');
   }
  Gradefunc(){
    this.showstudents=false;
    this.showschedule= false;
    this.showBehavior=false;
    this.showGrade=true;
    localStorage.setItem('showGrade','forth');
    localStorage.removeItem('showstudents');
    localStorage.removeItem('showschedule');
    localStorage.removeItem('showBehavior');
   }
   SortByName(){
    this.sort=1;
    this.teacherservice.sortStudents(+this.class_id,this.sort,0,0).subscribe((res:any)=>{
    this.sortedByName=res['data'];

    this.teacherservice.sortname=this.sortedByName;

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

    goBehaviorSetting(){
      this.router.navigate(['../behavior-setting'],{ relativeTo: this.route})
    }
  type(num:any) {
     console.log("nummmm",num)
  }

  select(item: any) {
    this.selected = item;
    console.log('selllllected', this.selected);
    if (item != 'students') {
      this.showschedule = false;
      this.hideCoursesAndBags = false;
    } else {
      // this.showschedule=true ;
      this.hideCoursesAndBags = true;
    }
  }
  isActive(item: any) {
    return this.selected === item;
  }

  changeCourse(event: any) {
    localStorage.setItem('course_id', event.target.value);
    // console.log("ccccc",event.target.value)
  }

  // addLesson(){
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     data:{id:id, name:'Are you sure you want to delete ?'},
  //     });
  //    dialogRef.afterClosed().subscribe(result => {
  //       //  console.log(result);
  //     });
  // }
 AddMainItem(lesson:any): void {
    const dialogRef = this.dialog.open(AddMainItemComponent, {

    });

}
AddSubItem(): void {
  const dialogRef = this.dialog.open(AddSubItemComponent , {

  });
}
editgradeImage(): void {
  const dialogRef = this.dialog.open(EditGradeImageComponent , {

  });
}
}
