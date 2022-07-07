import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TeacherService } from '../teachers/teacher.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private teacherservice:TeacherService,
  ) {}

 
  ngOnInit(): void {

  }
  deleteDialog(id:number){
    if(this.data.from == "attendance"){
      this.teacherservice.deleteAttendanceCase(this.data.id).subscribe(_=>{})
    }else{
      this.deleteDialog(this.data.id)
    }
    console.log("id",typeof(id))
    this.teacherservice.deleteLesson(id).subscribe(res=>{
      console.log("Delete Dialog",res)
      // Swal.fire({
      //   title: 'Delete Process Success',
      //   text: 'success',
      //   icon: 'success',
      //   confirmButtonColor: '#37B673',
      // }) 
         this.dialogRef.close() 
        // location.reload()
         setTimeout(() =>{
            location.reload()
            },1500);
       
      
       
    })
    
    
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
