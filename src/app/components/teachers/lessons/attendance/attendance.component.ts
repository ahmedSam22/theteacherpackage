import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  lessonData:any;
  constructor(private service:TeacherService) {

   }

  ngOnInit(): void {
    this.service.getLessonById(history.state.id).subscribe((res:any)=>{
      console.log(res);
      this.lessonData = res.data
      
    })
    console.log(history.state , "testtttttttttt")


  }

}
