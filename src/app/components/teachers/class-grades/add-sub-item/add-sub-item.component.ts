import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { TeacherService } from '../../teacher.service';


@Component({
  selector: 'app-add-sub-item',
  templateUrl: './add-sub-item.component.html',
  styleUrls: ['./add-sub-item.component.scss']
})
export class AddSubItemComponent implements OnInit {
  AddSubForm!: FormGroup;
  GradesList:any[]= [];
getMainItem:any;
  course_id:any=localStorage.getItem("course_id");
  constructor( public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private TeacherService:TeacherService  , private FormBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.AddSubForm = this.FormBuilder.group({
      evaluation_item_name: ['', Validators.required],

      evaluation_item_data_type: ['', Validators.required],
      first_option: ['', Validators.required],
      second_option: ['', Validators.required],
    });

  }
  mainitemChanged(value:any) {
    this.TeacherService.showGradeDetailsbyClassId(this.course_id).subscribe(data=>{
      console.log(data);

    this.GradesList = data.data.grade_main_items
    console.log(this.GradesList);
    localStorage.setItem("grade_id" , data.data.id)
    console.log(value);
  })
}
getmainitem(value:any) {
this.getMainItem=value;
  console.log(this.getMainItem.grade_id , this.getMainItem.id);
}
onSubmit(form: any) {

  console.log(form);
  let forms = {
    ...this.AddSubForm.value ,
    grade_id:this.getMainItem.grade_id,
    grade_main_item_id:this.getMainItem.id
  }
  this.TeacherService.AddSubItem(forms).subscribe((data) => {
    console.log(data);
  });
  setTimeout(()=>{
    this.AddSubForm.reset
    location.reload()
  } , 0)

}
}
