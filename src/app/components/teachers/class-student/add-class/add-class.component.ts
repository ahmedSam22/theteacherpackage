import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from 'src/app/pubilc/public.service';
import Swal from 'sweetalert2';
import { TeacherService } from '../../teacher.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {
  public submitted = false;
  form!:FormGroup;
  imgpath:any;
  base64Image:any ;
  file:File[]=[];
  showImg=true ;
  images : string[] = [];
  colors : any[] = [];
  imagePath :string[]= [];
  @ViewChild("image") image: any;
  @ViewChild("student") s : any;
  student!:ElementRef;
   classname='active' ;
  selected:any;
  showStudentInfo:boolean=true ;
  showGardianInfo:boolean=false ;
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService, private renderer: Renderer2 ,private elementRef: ElementRef,private pservice :PublicService ) {
  }

 


ngOnInit(): void {
  this.form = this.formbuilder.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    courses : this.formbuilder.array([
      this.formbuilder.control("")
    ]),
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    color_id: ['', Validators.required],
  });

  this.select('student');
  this.pservice.getAllColors().subscribe((res:any)=>{
    
    this.colors = res.data
    console.log(this.colors);
  })
  
}



get getCourses():any {
  return this.form.get("courses") as FormArray
}

addCourse() {
  this.getCourses.push(this.formbuilder.control(""))
  "tamam"
}

setColor(selectedColor:any){
  this.form.controls["color_id"].setValue(selectedColor)
}
 
back(){
  this.router.navigate(['../home/class-student/details']);
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
  this.teacherservice.createClass(this.form.value).subscribe((res:any)=>{
    console.log(res);
    if (res.status === false) {
      Swal.fire({  title: '',
      text: res.errors[0],
      icon: 'error',
      confirmButtonColor: '#4AB673',

    });      } else {
      Swal.fire('class added successfully');
   
      this.router.navigate(["/home"]);
    }
  })
  console.log(this.form.value);

this.submitted=true;


}
}
