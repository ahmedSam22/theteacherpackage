import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public submitted = false;
  form!:FormGroup;
  startDate = new Date();
  date:string='';
  start:string='';
  end:string='';
  value:any;
 
 
  @ViewChild('picker') picker!:ElementRef;
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService, private renderer: Renderer2 ,private elementRef: ElementRef ) {
  
    }

  ngOnInit(): void {
   
    this.form = this.formbuilder.group({
      name: ['', Validators.required],
      dat: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      repetition: ['', Validators.required],
    
    })

  }
 
  get f() { 
       return this.form.controls
    }
    back(){
      this.router.navigate(['../home/class-student/class-schedual']);
    }
    onSubmit(){
      this.submitted=true;
      this.date=this.form.value.dat.toString().substring(4,15);
     let myForm={
      ...this.form.value,
      date:this.date,
      course_id:396
     }
      
      // this.start=this.form.value.start_time;
      // this.end=this.form.value.end_time;
      
      // console.log("start date",this.start )
      // console.log("end date",this.end )
      // console.log("date",this.date )
      this.teacherservice.createLesson(myForm).subscribe((res:any)=>{
        console.log("create lesson",res)
        Swal.fire(
          `Lesson Added Successfully `,
          ``,
          `success`
          )
      })
      setTimeout(() =>{
        this.router.navigate(['../home/class-student/class-schedual'])
        },1500);
    
    }
}
