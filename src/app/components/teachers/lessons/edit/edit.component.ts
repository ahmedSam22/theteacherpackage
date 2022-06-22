import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import Swal from 'sweetalert2';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public submitted = false;
  form!:FormGroup;
  startDate = new Date();
  date!:string;
  lesson:any;
  @ViewChild('picker3') picker3!:any;
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder , public dialogRef: MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public data:any,private teacherservice:TeacherService, private renderer: Renderer2 ,private elementRef: ElementRef ) {
  }
  ngOnInit(): void {
    
    this.lesson=this.data;
    this.form = this.formbuilder.group({
      name: [this.lesson.name, Validators.required],
      dat: [ '', Validators.required],
      start_time: [this.lesson.start_time, Validators.required],
      end_time: [this.lesson.end_time, Validators.required],
      repetition: [this.lesson.repetition, Validators.required],
     })

    console.log("Edit Dialog" , this.lesson)
  }
  get f() { 
    return this.form.controls
    }
    back(){
      this.router.navigate(['../home/class-student/class-schedual']);
    }
    onSubmit(){
     this.date=this.form.value.dat.toString().substring(4,15);
     
     console.log("edit date",this.date)

     let editform={
      ...this.form.value,
      date:this.date, 
      lesson_id:this.data.id,
      course_id:this.data.course.id,
     }
     console.log("eeeeeee",editform)
     this.teacherservice.updateLesson(editform).subscribe((res:any)=>{
      console.log("edit lesson success" , res)
      Swal.fire(
        `Lesson Updated Successfully `,
        ``,
        `success`
        )
     })
    }
  }