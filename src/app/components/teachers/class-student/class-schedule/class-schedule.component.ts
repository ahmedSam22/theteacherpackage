import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { EditComponent } from '../../lessons/edit/edit.component';
import { TeacherService } from '../../teacher.service';
 
@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent implements OnInit {
  public value = new Date();
  selected!:Date|null;
 
  animal!: string;
  name!: string;
  startDate = new Date().toString();
  currentDate!:string;
  form!:FormGroup;

  fullLongDate!:string;
  longMonth!:string;

  lessons!:any;
  constructor(public dialog: MatDialog ,private router:Router,private formbuilder:FormBuilder,private teacherservice:TeacherService,) {}

  editLesson(lesson:any): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data:lesson,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    
    // });
    console.log("edit lesson",lesson)
  }

  deleteLesson(id:number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    data:{id:id, name:'Are you sure you want to delete ?'},
    });
   dialogRef.afterClosed().subscribe(result => {
      //  console.log(result);
    });
  }
  ngOnInit(): void {
 
    this.currentDate=this.startDate.substring(0, 15)
    
  }
  changess(){
    let restOfData=this.selected?.toString().substring(7,15);

    let days=restOfData?.substring(0,4);
    let years=restOfData?.substring(3)
    console.log("days",days)
    console.log("years",years)
    let shortmonth=this.selected?.toString().substring(4,7);
    console.log("ssss",typeof(shortmonth))
    if(shortmonth=='Jan') {
       this.longMonth='January';
       console.log("Jan",this.longMonth)
    }
    else if (shortmonth=='Feb'){
      this.longMonth='February';
      console.log("Feb",this.longMonth)
    }
    else if (shortmonth=='Mar'){
      this.longMonth='March';
      console.log("Mar",this.longMonth)
    }
    else if (shortmonth=='Apr'){
      this.longMonth='April';
      console.log("Apr",this.longMonth)
    }
    else if (shortmonth=='May'){
      this.longMonth='May';
      console.log("May",this.longMonth)
    }
    else if (shortmonth=='Jun'){
      this.longMonth='June';
      console.log("Jun",this.longMonth)
    }
    else if (shortmonth=='Jul'){
      this.longMonth='July';
      console.log("Jul",this.longMonth)
    }
    else if (shortmonth=='Aug'){
      this.longMonth='August';
      console.log("Aug",this.longMonth)
    }
    else if (shortmonth=='Sep'){
      this.longMonth='September';
      console.log("Sep",this.longMonth)
    }
    else if (shortmonth=='Oct'){
      this.longMonth='October';
      console.log("Oct",this.longMonth)
    }
    else if (shortmonth=='Nov'){
      this.longMonth='November';
      console.log("Nov",this.longMonth)
    }
    else if (shortmonth=='Dec'){
      this.longMonth='December';
      console.log("Dec",this.longMonth)
    }
    else {
      console.log("el sana 5elset hhhhhh ");
    }
    // this.fullLongDate =  this.longMonth+restOfData
    this.fullLongDate =  days+this.longMonth+years
    console.log("longMonth",this.fullLongDate)

    
    this.teacherservice.getLessonsByDate(396,this.fullLongDate).subscribe((res:any)=>{
      this.lessons=res['data']
      console.log("Lessons By Date", this.lessons)
    })
  }
  
}
