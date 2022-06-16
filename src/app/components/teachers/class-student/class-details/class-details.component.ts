import { Component, ElementRef, OnInit } from '@angular/core';
 
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
 
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
femalefilter!:number;
malefilter!:number;
defaultsearch='search'
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService ,private elementRef: ElementRef ) {
   
  }

  ngOnInit(): void {
      this.searchResult=this.route.snapshot.params['search'];
       console.log("param",this.searchResult);
       if(this.searchResult=='search'){
   
       }
        else {
      //   this.teacherservice.searchStudent(25).subscribe((res:any)=>{
      //     this.classStudents=res['data']
      //   console.log("oooooooooo",this.classStudents)
      //  })


       this.femalefilter=2;
       this.teacherservice.searchStudent(25,'',this.femalefilter).subscribe((res:any)=>{
           this.classStudents=res['data']
         console.log("ffffffffffff",this.classStudents)
        })
       }
   
   
    
  }
  
}
