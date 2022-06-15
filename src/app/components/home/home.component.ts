import { TeacherService } from './../teachers/teacher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class ClassComponent implements OnInit {
public allClasses:any;
  constructor(private service:TeacherService) { }

  ngOnInit(): void {
      this.service.getAllClasses().subscribe((res:any)=>{
        this.allClasses = res.data
      })
  }
addNewClass(){

}
}
