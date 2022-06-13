import { TeacherService } from './../teachers/teacher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class ClassComponent implements OnInit {

  constructor(private teacher :TeacherService ) { }

  ngOnInit(): void {
    this.teacher.getAllClasses().subscribe((res:any)=>{
      console.log("res is here",res.data);
      
    })
  }

}
