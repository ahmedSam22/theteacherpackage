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
  constructor(private service:TeacherService,private router : Router , private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.getAllClasses() 
  }

  getAllClasses(){
    this.service.getAllClasses().subscribe((res:any)=>{
      this.allClasses = res['data']
      console.log("all classess" , this.allClasses)
      if(this.allClasses.length == 0 ){
        // this.hideClass=true ; 
        this.showClass=false ; 
      }
      else {
        // this.hideClass=false ; 
        this.showClass=true ; 
      }
    })
  }
  editClass(){

  }

  deleteClass(classId:any){
    this.service.deleteClass(classId).subscribe((res:any)=>{
      this.getAllClasses() 

      
    })
  }

  goToStudents(){
    this.router.navigate(['../home/class-student',this.searchParam],{ relativeTo: this.route})
  }
}
