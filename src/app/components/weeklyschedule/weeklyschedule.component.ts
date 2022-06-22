import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teachers/teacher.service';

@Component({
  selector: 'app-weeklyschedule',
  templateUrl: './weeklyschedule.component.html',
  styleUrls: ['./weeklyschedule.component.scss']
})
export class WeeklyscheduleComponent implements OnInit {
   lessons:any;
   hideScehedule!:boolean;
   showScehedule!:boolean;
  constructor(private teacherservice:TeacherService) { }

  ngOnInit(): void {
    this.teacherservice.getWeeklySchedule().subscribe((res:any)=>{
      this.lessons=res['data'];
      console.log("ressss",this.lessons)
      if(this.lessons==[]){
        this.hideScehedule=true;
        this.showScehedule=false;
      }
      else {
        this.showScehedule=true;
        this.hideScehedule=false;
      }
    })

  
  }

  print(){
    const printContent:any = document.getElementById("lesson");
    const WindowPrt:any = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
