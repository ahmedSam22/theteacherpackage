import { Component, ElementRef, OnInit } from '@angular/core';
 
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Params, Router } from '@angular/router';
 
import { map, Observable } from 'rxjs';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
classStudents:any=[];
searchResult:any;
femaleSearch!:number;
maleSearch!:number;
studentname!:string;
defaultsearch='search';
currentRoute: string;
sortName:any;
sortGender:any;
search='search';
class_id:any;
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService ,private elementRef: ElementRef ) {
    this.currentRoute = "";
    this.sortName=[];
    this.sortGender=[];
    this.router.events.subscribe((event)=>{
        if (event instanceof NavigationStart) {
          this.searchResult='search'
        }

        if (event instanceof NavigationEnd) {
          this.class_id =localStorage.getItem('class_id');
          this.searchResult=this.route.snapshot.params['search'];
          console.log("param",this.searchResult);
    
          if(this.searchResult=='search'){
             this.teacherservice.searchStudent(+this.class_id).subscribe((res:any)=>{
             this.classStudents=res['data']
           console.log("oooooooooo",this.classStudents)
            })
          }
          else if(this.searchResult=='female'||this.searchResult=='Female'||this.searchResult=='FEMALE'){
           this.femaleSearch=2;
           this.teacherservice.searchStudent(+this.class_id,'',this.femaleSearch).subscribe((res:any)=>{
               this.classStudents=res['data']
             console.log("FEMALE",this.classStudents)
            })
          }
          else if(this.searchResult=='male'||this.searchResult=='Male'||this.searchResult=='MALE'){
           this.maleSearch=1;
           this.teacherservice.searchStudent(+this.class_id,'',this.maleSearch).subscribe((res:any)=>{
               this.classStudents=res['data']
             console.log("MALE",this.classStudents)
            })
          }
          else if(this.teacherservice.sortname!=[]&&this.searchResult=='name'){
            this.classStudents=this.teacherservice.sortname;
           
          }
          else if(this.teacherservice.sortgender!=[]&&this.searchResult=='gender'){
            this.classStudents=this.teacherservice.sortgender;
            
          }
         else {
             this.studentname=this.searchResult
             this.teacherservice.searchStudent(+this.class_id,this.studentname).subscribe((res:any)=>{
               this.classStudents=res['data']
              //  this.router.navigate(['../../class-student',this.search],{ relativeTo: this.route})
             console.log("Student Name",this.classStudents)
            })
          }
        }

        if (event instanceof NavigationError) {
          console.log("error",event);
        }
    });
  }

  ngOnInit(): void {
 
    // console.log('SortByName',this.teacherservice.sortname)
    // console.log('SortByGender',this.teacherservice.sortgender) 
   
    }
}
