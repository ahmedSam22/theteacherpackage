import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  lessonData:any;
  lessonId:any;
  allAttendanceCases:any;
  allStudentAttendance:any;

  constructor(private service:TeacherService) {

   }

  ngOnInit(): void {
    this.lessonId = localStorage.getItem('class_id') 
    this.service.getLessonById(this.lessonId).subscribe((res:any)=>{
      console.log(res);
      this.lessonData = res.data
      
    })

    this.service.getAllAttendanceCases(this.lessonId).subscribe((res:any)=>{
      console.log(res);
      this.allAttendanceCases = res.data
      
    })
    this.service.getAllStudentAttendance(this.lessonId).subscribe((res:any)=>{
      console.log(res);
      this.allStudentAttendance = res.data
      
    })
    console.log(history.state , "testtttttttttt")


  }

}
