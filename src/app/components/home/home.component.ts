import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from './../teachers/teacher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class ClassComponent implements OnInit {
public allClasses:any;
hideClass!:boolean;
showClass!:boolean;
searchParam:string='search';
 
  constructor(private teacherservice:TeacherService,private router : Router , private route:ActivatedRoute ) { }

  ngOnInit(): void {
      this.teacherservice.getAllClasses().subscribe((res:any)=>{
        this.allClasses = res['data']
     
        console.log("all classess" , this.allClasses)
        if(this.allClasses==[]){
          this.hideClass=true ; 
          this.showClass=false ; 
        }
        else {
          this.hideClass=false ; 
          this.showClass=true ; 
        }
      let courses;
       for(var i=0 ; i<=this.allClasses.length ; i++){
          courses=this.allClasses[i].courses
         
           }
        })     
        // console.log("All Courses",this.courses);
  }
  editClass(){

  }

  deleteClass(){

  }

  goToStudents(class_id:any){
    this.teacherservice.class_id=class_id ;
    localStorage.setItem('class_id',class_id);
     console.log("service",this.teacherservice.class_id)
    this.router.navigate(['../home/class-student',this.searchParam] )
  }
}
