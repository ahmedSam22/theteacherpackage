import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import Swal from 'sweetalert2';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public submitted = false;
  form!: FormGroup;
  startDate = new Date();
  date!: string;
  lesson: any;

  @ViewChild('picker3') picker3!: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teacherservice: TeacherService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}
  ngOnInit(): void {
    // 21 July 2022
    // '2022-07-29T22:00:00.000Z'
    this.lesson = this.data;
    // console.log("Edit Dialog" , this.lesson)
    // console.log("gggggggggggggg",this.lesson.date?.toString().substring(0,3))
    var n = this.lesson.date?.toString().split(' ');
    var year = n[n.length - 1];
    var month = n[n.length - 2];
    var day = n[n.length - 3];
    // console.log("year",year )
    // console.log("month",month)
    // console.log("day", day)
    if (month == 'January') {
      month = '01';
      // console.log("Jan",month)
    } else if (month == 'February') {
      month = '02';
      // console.log("Feb", month)
    } else if (month == 'March') {
      month = '03';
      // console.log("Mar",month)
    } else if (month == 'April') {
      month = '04';
      // console.log("Apr",month)
    } else if (month == 'May') {
      month = '05';
      // console.log("May",month)
    } else if (month == 'June') {
      month = '06';
      // console.log("Jun",month)
    } else if (month == 'July') {
      month = '07';
      //  console.log("Jul",month)
    } else if (month == 'August') {
      month = '08';
      // console.log("Aug",month)
    } else if (month == 'September') {
      month = '09';
      // console.log("Sep",month)
    } else if (month == 'October') {
      month = '10';
      //  console.log("Oct",month)
    } else if (month == 'November') {
      month = '11';
      // console.log("Nov",month)
    } else if (month == 'December') {
      month = '12';
      // console.log("Dec",month)
    } else {
      console.log('el sana 5elset hhhhhh ');
    }

    let d = year + '-' + month + '-' + (day - 1) + 'T22:00:00.000Z';
    console.log('ddddddddddddddd', d);
    this.form = this.formbuilder.group({
      name: [this.lesson.name, Validators.required],
      dat: [d, Validators.required],
      start_time: [this.lesson.start_time, Validators.required],
      end_time: [this.lesson.end_time, Validators.required],
      repetition: [this.lesson.repetition, Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }
  back() {
    this.router.navigate(['../home/class-student/class-schedual']);
  }
  onSubmit() {
    this.date = this.form.value.dat.toString().substring(4, 15);

    console.log('edit date', this.date);

    let editform = {
      ...this.form.value,
<<<<<<< HEAD
      date: this.date,
      lesson_id: this.data.id,
      course_id: this.data.course.id,
    };
    console.log('eeeeeee', editform);
    this.teacherservice.updateLesson(editform).subscribe((res: any) => {
      console.log('edit lesson success', res);
      Swal.fire(`Lesson Updated Successfully `, ``, `success`);
    });
    //  this.router.navigate(['../home/class-student/class-schedual']);
  }
}
=======
      date:this.date, 
      lesson_id:this.data.id,
      course_id:this.data.course.id,
     }
     console.log("eeeeeee",editform)
     this.teacherservice.updateLesson(editform).subscribe((res:any)=>{
      console.log("edit lesson success" , res)
      if(res.status==true){
        Swal.fire({
          title: 'Success'  ,
          text: 'Lesson Updated Successfully '  ,
          icon: 'success',
          confirmButtonColor: '#37B673',
        }) 
      }
      else {
        Swal.fire({
          title: 'Fail'  ,
          text:res.errors[0]  ,
          icon: 'error',
          confirmButtonColor: '#37B673',
        }) 
      }
    
     })
   
    }
     
  }
>>>>>>> 5d70d547cdf198412df55168cc040ac1a728f122
