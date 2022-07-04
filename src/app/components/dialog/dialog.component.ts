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
    console.log("id",typeof(id))
    this.teacherservice.deleteLesson(id).subscribe(res=>{
      console.log("Delete Dialog",res)
      Swal.fire(
        `Delete Process Success `,
        ``,
        `success`
        )
    })
    this.dialogRef.close();
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
