import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService ,private elementRef: ElementRef ) {
  }

  ngOnInit(): void {
    
    this.teacherservice.searchStudent(60).subscribe((res:any)=>{
      console.log("all student in class" , res)
     })
  }

}
