

import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';
import { TeacherService } from '../teachers/teacher.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
   class_id:any;
   @ViewChild('inputVal') inputVal!:ElementRef;
   in_val:any;
   showAlert=false;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private teacherservice:TeacherService,
   ) { }

  ngOnInit(): void {
    this.class_id = localStorage.getItem('class_id');
    //  console.log("behavior",this.data.from)
 
   }
 
  Save(){
    if(this.data.from=='behavior') {
      this.showAlert=true
    this.in_val=this.inputVal.nativeElement.value
      let form = {
        class_id:this.class_id ,
        negative_behaviors_count_limit :this.in_val
      }
      console.log("form",form)
       this.teacherservice.setNegativeBehaviorAlert(this.class_id,this.in_val).subscribe((res:any)=>{
         setTimeout(() =>{    
          this.dialogRef.close() ;
           },2000);
        if(res.status==true){
          console.log("add limit",res)
          // setTimeout(() =>{  
            Swal.fire({
             title: res.message,
             text: 'success',
             icon: 'success',
             confirmButtonColor: '#37B673',
           }) 
          // },2000);
         }
        else {
          setTimeout(() =>{    
            this.dialogRef.close() ;
             },2000);
             Swal.fire({
              title:'Fail',
              text: 'Please Add Negative Behavior Limit',
              icon: 'error',
              confirmButtonColor: '#37B673',
            }) 
        }
       })

      }
      else if(this.data.from=='behaviorSetting'){
        this.in_val=this.inputVal.nativeElement.value
        let form={
          name:this.in_val,
          type:this.data.type  
          }
          console.log("ffffff", form)
        this.teacherservice.createBehavior(form).subscribe((res:any)=>{
          setTimeout(() =>{    
            this.dialogRef.close() ;
             },2000);
          if(res.status==true){
            console.log("add limit",res)
           
              Swal.fire({
               title: 'Behavior Create Successfully',
               text: 'success',
               icon: 'success',
               confirmButtonColor: '#37B673',
             }) 
          
           }
          else {
            setTimeout(() =>{    
              this.dialogRef.close() ;
               },2000);
               Swal.fire({
                title:'Fail',
                text: 'Please Add Behavior',
                icon: 'error',
                confirmButtonColor: '#37B673',
              }) 
          }
        })
        
      }
      else {
        console.log("ay kalam")
      }
  }
}
