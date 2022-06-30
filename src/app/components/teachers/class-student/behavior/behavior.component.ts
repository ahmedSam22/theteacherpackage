import { Component, OnInit } from '@angular/core';
import { AddStudentBehaviorComponent } from '../../add-student-behavior/add-student-behavior.component';
import { TeacherService } from '../../teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, UrlSegment } from '@angular/router';
@Component({
  selector: 'app-behavior',
  templateUrl: './behavior.component.html',
  styleUrls: ['./behavior.component.scss']
})
export class BehaviorComponent implements OnInit {
  behaviors:any=[];
  students:any=[];
  class_id:any;
  show_execlamation_mark=true;
  positive:any=[];
  p_sum:any;

  negative:any=[];
  n_sum:any;
  
  constructor(public dialog: MatDialog ,private teacherservice:TeacherService , private route:ActivatedRoute) { }

  ngOnInit(): void {
     
    this.class_id =localStorage.getItem('class_id');
    this.teacherservice.searchStudent(+this.class_id).subscribe((res:any)=>{
      this.students=res['data']
    
    console.log("oooooooooo",this.students)
    for(let i=0 ; i<=this.students.length ; i++){
     
      this.positive.push(this.students[i].behavior_scores.positive_behavior_score);
      // console.log("PPPPPPPPPPPPP",this.positive)
      this.p_sum = this.positive.reduce((acc:number, cur:number) => acc + cur, 0);
     console.log("ppppp",this.p_sum)

        this.negative.push(this.students[i].behavior_scores.negative_behavior_score);
        // console.log("PPPPPPPPPPPPP",this.positive)
        this.n_sum = this.negative.reduce((acc:number, cur:number) => acc + cur, 0);
          console.log("nnnnnnnnn",this.n_sum)
    }
   
    // .is_negative_behaviors_limit_exceeded
     })
    // this.teacherservice.getAllBehaviors().subscribe((res:any)=>{
    //   this.behaviors=res['data']
    //   console.log("All behaviors", this.behaviors)
    // })
    this.route.url.subscribe((urlPath:UrlSegment[]) => {
      const url = urlPath[urlPath.length - 1].path;
      console.log('Back button pressed',url);
      if(url=='class-behavior'){
          localStorage.setItem('showBehavior','third');
          localStorage.removeItem('showstudents');
          localStorage.removeItem('showschedule');
        }
     else {
      console.log("teeeeest")
     }
      })
      
         
  }
  addStudentBehavior(student:any){
    const dialogRef = this.dialog.open(AddStudentBehaviorComponent, {
      data:student,
       
    });
    dialogRef.afterClosed().subscribe(result => {
      location.reload()
    });
    // console.log("idddddd",student)
  }
}
