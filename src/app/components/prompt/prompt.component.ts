

import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      let limit=this.inputVal.nativeElement.value
      let form = {
        class_id:this.class_id ,
        negative_behaviors_count_limit :limit
      }
      console.log("form",form)
       this.teacherservice.setNegativeBehaviorAlert(this.class_id,limit).subscribe((res:any)=>{
        console.log("add limit",res)
       })

      }
  }
}
