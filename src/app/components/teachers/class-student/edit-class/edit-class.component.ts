import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from 'src/app/pubilc/public.service';
import Swal from 'sweetalert2';
import { TeacherService } from '../../teacher.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {
  public submitted = false;
  form!:FormGroup;
  imgpath:any;
  classData:any;
  date!:string;

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
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService, private renderer: Renderer2 ,private elementRef: ElementRef,private pservice :PublicService , public dialogRef: MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public data:any) {
  }

 


ngOnInit(): void {
  // alert(this.coursesCounter())
  // this.classData = this.route.snapshot.paramMap.get('id')
  this.classData=this.data;
  console.log("tessssssssst" , this.data);
  
  this.form = this.formbuilder.group({
    class_id: [this.data.id, Validators.required],
    name: [this.data.name],
    code: [this.data.code],
    courses :this.formbuilder.array([
      // this.formbuilder.control("")
    ]),
    start_date: [this.data.start_date],
    end_date: [this.data.end_date],
    color_id: [this.data.color.id],
  });
  // this.teacherservice.getClassDetails(this.classId).subscribe((res:any)=>{
  //   console.log(res);
    
  // })
  
  this.select('student');
  this.pservice.getAllColors().subscribe((res:any)=>{
    
    this.colors = res.data
    console.log(this.colors);
  })
  for(let i = 0; i < this.data.courses.length;i++){
    this.getCourses.push( this.formbuilder.control(this.data.courses[i].name)  )
  }
  
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
  this.teacherservice.editClass(this.form.value).subscribe((res:any)=>{
    console.log(res);
    if (res.status === false) {
      Swal.fire({  title: '',
      text: res.errors[0],
      icon: 'error',
      confirmButtonColor: '#4AB673',

    });      } else {
      Swal.fire('edit successfully');
   
      this.router.navigate(["/home"]);
    }
  })
  console.log(this.form.value);

this.submitted=true;


}
}
