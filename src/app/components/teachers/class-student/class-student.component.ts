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

  class_id: any;
  sort = 0;

  hideCoursesAndBags: boolean = true;
  showstudents: boolean = true;
  showschedule: boolean = false;
  showBehavior: boolean = false;
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
    this.select('students');
   }
   else if(localStorage.getItem('showschedule')=='second') {
    this.showstudents=false; 
    this.showschedule= true;
    this.showBehavior=false;
    this.select('schedule');
   }
   else if (localStorage.getItem('showBehavior')=='third') {
    this.showstudents=false; 
    this.showschedule= false;
    this.showBehavior=true;
    this.select('behavior');
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
    localStorage.setItem('showstudents','first');
    localStorage.removeItem('showschedule');
    localStorage.removeItem('showBehavior');
   }
   schedulefunc(){
    this.showstudents=false; 
    this.showschedule= true;
    this.showBehavior=false;
    localStorage.setItem('showschedule','second');
    localStorage.removeItem('showstudents');
    localStorage.removeItem('showBehavior');
   }
   behaviorfunc(){
    this.showstudents=false; 
    this.showschedule= false;
    this.showBehavior=true;
    localStorage.setItem('showBehavior','third');
    localStorage.removeItem('showstudents');
    localStorage.removeItem('showschedule');
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
  // schedulefunc() {
  //   this.showstudents = false;
  //   this.showschedule = true;
  //   this.showBehavior = false;
  // }
  // behaviorfunc() {
  //   this.showstudents = false;
  //   this.showschedule = false;
  //   this.showBehavior = true;
  // }
  // SortByName() {
  //   this.sort = 1;
  //   this.teacherservice
  //     .sortStudents(+this.class_id, this.sort, 0, 0)
  //     .subscribe((res: any) => {
  //       this.sortedByName = res['data'];

  //       this.teacherservice.sortname = this.sortedByName;
  //       let name = 'name';
  //       this.router.navigate(['../class-student', name], {
  //         relativeTo: this.route,
  //       });
  //     });
  // }
  // SortByGender() {
  //   this.sort = 1;
  //   this.teacherservice
  //     .sortStudents(+this.class_id, 0, this.sort, 0)
  //     .subscribe((res: any) => {
  //       this.sortedByGender = res['data'];
  //       this.teacherservice.sortgender = this.sortedByGender;

  //       let gender = 'gender';
  //       this.router.navigate(['../class-student', gender], {
  //         relativeTo: this.route,
  //       });
  //     });
  // }

  //  () {
  //   this.searchResult = this.search.nativeElement.value;
  //   console.log('Search', this.searchResult);
  //   if (this.searchResult != '') {
  //     this.router.navigate(['../class-student', this.searchResult], {
  //       relativeTo: this.route,
  //     });
  //   } else {
  //     this.router.navigate(['../class-student', this.navigate], {
  //       relativeTo: this.route,
  //     });
  //   }
  // }
  // type(num: any) {
  //   console.log('nummmm', num);
  // }
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
