import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DialogComponent } from '../../dialog/dialog.component';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add-behavior',
  templateUrl: './add-student-behavior.component.html',
  styleUrls: ['./add-student-behavior.component.scss']
})
export class AddStudentBehaviorComponent implements OnInit {
  public submitted = false;
  form!:FormGroup;
  
  @ViewChild("student") s : any;
  student!:ElementRef;
  classname='active' ;
  selected:any;
  showPositiveInfo:boolean=true ;
  showNegativeInfo:boolean=false ;
  showRecordInfo:boolean=false ;
  class_id:any;
  allBehaviors:any=[]
  positives:any=[]
  negatives:any=[];
  
  studentAllBehaviors:any=[]
  studentgood:any=[];
  studentbad:any=[];

  isChecked:boolean=false;
  goodbehave:any=[];
  badbehave:any=[];
  student_name=this.data.full_name;
  course_id:any;
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService, private renderer: Renderer2 ,private elementRef: ElementRef  , public dialogRef: MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public data:any) {
  }
  ngOnInit(): void {
    console.log("All data",this.data.id)
  
      let obj= {id:0 , name:'name'} 
    this.teacherservice.getAllBehaviors().subscribe((res:any)=>{
      this.allBehaviors=res['data'];
      console.log("ressssssssssssssssssssss", this.allBehaviors)
      for(let i=0; i<=this.allBehaviors.length ; i++){
        if( this.allBehaviors[i].type==1){
          obj.id=this.allBehaviors[i].id;
          obj.name= this.allBehaviors[i].name;
          // console.log("oooooooobbbbbbbbbb",obj)
             this.positives.push({id:obj.id,name:obj.name})
        }
        else {
          obj.id=this.allBehaviors[i].id;
          obj.name= this.allBehaviors[i].name;
          // console.log("oooooooobbbbbbbbbb",obj)
          this.negatives.push({id:obj.id,name:obj.name})
        }
      }
    })
    this.select('student');
    this.class_id = localStorage.getItem('class_id');
    this.course_id = localStorage.getItem('course_id');
    // console.log("cccccccccccc", this.course_id)
 


    let obj2= {id:0 , name:'name'} 
    this.studentAllBehaviors =this.data.behaviors;
    console.log("studentAllBehaviors",this.studentAllBehaviors)
    for(let i=0; i<=this.studentAllBehaviors.length ; i++){
      if( this.studentAllBehaviors[i].type==1){
        obj2.id=this.studentAllBehaviors[i].id;
        obj2.name= this.studentAllBehaviors[i].name;
        this.studentgood.push({id:obj2.id,name:obj2.name})
      }
      else {
        obj2.id=this.studentAllBehaviors[i].id;
        obj2.name= this.studentAllBehaviors[i].name;
         this.studentbad.push({id:obj2.id,name:obj2.name})
      }
    }
  }

   filter(number:any) {
    if (number==0){
      this.showPositiveInfo=true ;  
      this.showNegativeInfo=false ; 
      this.showRecordInfo=false ; 
    }
    else if(number==1) {
      this.showPositiveInfo=false ;  
      this.showNegativeInfo=true ;
      this.showRecordInfo=false ; 
    }
    else{
      this.showPositiveInfo=false ;  
      this.showNegativeInfo=false ;
      this.showRecordInfo=true ; 
    }
  }
  select(item:any) {
    this.selected = item;
    console.log("selllllected",this.selected)
     };
  isActive(item:any) {
    return this.selected === item;
    }
    // get f() { 
    //   return this.form.controls
    // }

    deleteStudentBahvior(id:any){
      console.log("r5t3wq43324e",this.data.id)
       this.teacherservice.deleteBehaviorFromStudent(this.data.id,id,this.course_id).subscribe((res:any)=>{
        console.log("deleteBehaviorFromStudent",res)
      })
    }

    goodarr:any=[];
    addGoodBehavior(event:any,index:any){
      this.isChecked = event.target.checked;
       console.log(this.isChecked)
       if(this.isChecked==true && !this.goodbehave.includes(event.target.value)){
            this.goodbehave.push(event.target.value)
            this.goodarr=this.goodbehave  ;
           
      }
     else {
     for(let i=0; i<=this.goodarr.length ; i++) {
         if(event.target.value==this.goodarr[i]) {
              this.goodarr.splice(i,1)
            }
        }    
      }
     console.log("final good arr ",this.goodarr)
  } 
  badarr:any=[];
  addBadBehavior(event:any,index:any){
    this.isChecked = event.target.checked;
     console.log(this.isChecked)
     if(this.isChecked==true && !this.badbehave.includes(event.target.value)){
          this.badbehave.push(event.target.value)
          this.badarr=this.badbehave  ;
         
    }
   else {
   for(let i=0; i<=this.badarr.length ; i++) {
       if(event.target.value==this.badarr[i]) {
            this.badarr.splice(i,1)
          }
      }    
    }
   console.log("final bad arr ",this.badarr)
} 

send() {
  let form;
  
  if (this.showPositiveInfo==true){
    form={
      student_id:this.data.id,
      course_id:this.course_id,
      behaviors_ids:this.goodarr
      }
      this.teacherservice.addBehaviorToStudent(form).subscribe((res:any)=>{
        console.log("good behaviors",res)
     })
  }
  else if (this.showNegativeInfo==true){
    form={
      student_id:this.data.id,
      course_id:this.course_id,
      behaviors_ids:this.badarr
      }
      this.teacherservice.addBehaviorToStudent(form).subscribe((res:any)=>{
        console.log("bad behaviors",res)
     })
  }
  else {
    console.log("recccccccccccoed" )
  }
}
 
}
