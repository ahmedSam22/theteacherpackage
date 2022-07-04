import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import Swal from 'sweetalert2';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  public submitted = false;
  form!:FormGroup;
  imgpath:any;
  base64Image:any ;
  file:File[]=[];
  showImg=true ;
  images : string[] = [];
  imagePath :string[]= [];
  @ViewChild("image") image: any;
  @ViewChild("student") s : any;
  student!:ElementRef;
   classname='active' ;
  selected:any;
  showStudentInfo:boolean=true ;
  showGardianInfo:boolean=false ;
  class_id:any;
  // f_name_error:boolean=false ;
  // l_name_error:boolean=false ;
  // email_error:boolean=false ;
  // phone_error:boolean=false ;
  // gender_error:boolean=false ;
  // guardian_name_error:boolean=false ;
  // guardian_email_error:boolean=false ;
  // guardian_phone_error:boolean=false ;
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService, private renderer: Renderer2 ,private elementRef: ElementRef ) {
    }




  ngOnInit(): void {
    this.form = this.formbuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      guardian_name: ['', Validators.required],
      guardian_email: ['', Validators.required],
      guardian_phone: ['', Validators.required],
    });

    this.select('student');
    this.class_id = localStorage.getItem('class_id');

    this.route.url.subscribe((urlPath:UrlSegment[]) => {
      const url = urlPath[urlPath.length - 1].path;
      console.log('Back button pressed',url);
  })
  }

  back(){
    this.router.navigate(['../home/class-student/search']);
  }
  base64(event:any) {
    this.file= event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
    this.base64Image = reader.result;
     console.log("saasdswqadqwedwq",this.file[0])
    };
    this.showImg=false ;
  }
   filter(number:any) {
    if (number==0){
      this.showStudentInfo=true ;
      this.showGardianInfo=false ;
    }
    else {
      this.showStudentInfo=false ;
      this.showGardianInfo=true ;
    }
  }
  select(item:any) {
    this.selected = item;
    console.log("selllllected",this.selected)
     };
  isActive(item:any) {
    return this.selected === item;
    }
    get f() {

    return this.form.controls
    }

  onSubmit() {
    let form = {
      ...this.form.value ,
      class_id:this.class_id,
    }

  // if( form.first_name==undefined ||  form.first_name==""){
  //     this.f_name_error=true;
  // }
  // else if (form.last_name==undefined || form.last_name==""){
  //   this.l_name_error=true;
  // }
  // else if (form.email==undefined || form.email=="") {
  //   this.email_error=true ;
  // }
  // else if (form.phone==undefined || form.phone=="") {
  //    this.phone_error=true;
  // }
  // else if (form.gender==undefined || form.gender=="") {
  //   this.gender_error=true;
  // }
  // else if (form.guardian_name==undefined || form.guardian_name=="") {
  //   this.guardian_name_error=true;
  // }
  // else if (form.guardian_email==undefined || form.guardian_email=="") {
  //   this.guardian_email_error=true;
  // }
  // else if (form.guardian_phone==undefined || form.guardian_phone=="") {
  //   this.guardian_phone_error=true;
  // }
  // else {

  // console.log("kolo tamammmmm")
  //   this.f_name_error=false;
  //   this.l_name_error=false;
  //   this.email_error=false;
  //   this.phone_error=false ;
  //   this.gender_error=false;
  //   this.guardian_name_error=false;
  //   this.guardian_email_error=false;
  //   this.guardian_phone_error=false;

  // }
  this.submitted=true;
  if(this.form.invalid){return}
      console.log("Form",form)
      this.teacherservice.addStudentToClass(form).subscribe((res:any)=>{

        if(res.status==true){
          console.log("success add student", res) ;
          Swal.fire({
            title: 'Success',
            text: res.message,
            icon: 'success',
            confirmButtonColor: '#4AB673',
          })
          this.router.navigate(['../home/class-student/search'])
        }
     else {
      console.log("fail add student", res) ;
      Swal.fire({
        title: 'Fail',
        text: res.errors[0],
        icon: 'error',
        confirmButtonColor: '#4AB673',
      })
     }
      })

      ;
  }
}
