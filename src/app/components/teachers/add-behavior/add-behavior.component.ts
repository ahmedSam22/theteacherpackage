import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DialogComponent } from '../../dialog/dialog.component';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add-behavior',
  templateUrl: './add-behavior.component.html',
  styleUrls: ['./add-behavior.component.scss']
})
export class AddBehaviorComponent implements OnInit {
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
  positives:any=[];
  negatives:any=[];
  isChecked:boolean=false;
  behave:any=[];
  student_name=this.data.full_name;
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder ,private teacherservice:TeacherService, private renderer: Renderer2 ,private elementRef: ElementRef  , public dialogRef: MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public data:any) {
  }
  ngOnInit(): void {
    // this.form = this.formbuilder.group({
    //   positive :['', Validators.required],
    //  });
 
    this.teacherservice.getAllBehaviors().subscribe((res:any)=>{
      this.allBehaviors=res['data'];
      console.log("res", this.allBehaviors)
      for(let i=0; i<=this.allBehaviors.length ; i++){
        if( this.allBehaviors[i].type==1){
          this.positives.push( this.allBehaviors[i].name)
          console.log("ppp",this.positives)
        }
        else {
          this.negatives.push(this.allBehaviors[i].name)
          console.log("nnn",this.negatives)
        }
      }
    })
    this.select('student');
    this.class_id = localStorage.getItem('class_id');
  }
  get getBehaviors():any {
    return this.form.get("positive") as FormArray
  }
  
  addCourse() {
    this.getBehaviors.push(this.formbuilder.control(""))
    "tamam"
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
    get f() { 
    
    return this.form.controls
    }

    addBehavior(event:any , index:any){
     this.isChecked = event.target.checked;
       console.log(this.isChecked)
       if(this.isChecked==true && !this.behave.includes(event.target.value)){
 
             this.behave.push(event.target.value)
             console.log("push",this.behave)
     
       }
     else {
      console.log("index",index)
      this.behave.splice(index,1)
      console.log("pop",this.behave)
     }
      
    } 
  onSubmit() {
    let form = {
      ...this.form.value ,
      class_id:this.class_id,
    }
 
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
     
  
  }
}
