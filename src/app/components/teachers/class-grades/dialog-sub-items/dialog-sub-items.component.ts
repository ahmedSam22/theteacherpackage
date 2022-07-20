import { TeacherService } from './../../teacher.service';
import { Component, OnInit } from '@angular/core';

import { FormGroup ,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dialog-sub-items',
  templateUrl: './dialog-sub-items.component.html',
  styleUrls: ['./dialog-sub-items.component.scss']
})
export class DialogSubItemsComponent implements OnInit {

  AddSubForm!: FormGroup;
  select: any;
  alart: any;
  main: any;
  show: boolean =false;

  constructor(private FormBuilder:FormBuilder , private TeacherService:TeacherService) { }

  ngOnInit(): void {
    this.TeacherService.showMainItem(-1, localStorage.getItem("grade_id")).subscribe((data: any) => {
      this.main = data.data;
      if(data){
        this.show=true
      }else{
        this.show=false
      }
      console.log(data)})
    this.AddSubForm = this.FormBuilder.group({
      evaluation_item_name: [''],

      evaluation_item_data_type: [''],
      first_option: [''],
      second_option: ['' ],
    });
  }
  mainitemChanged(value:any) {
      this.select = value;
    console.log(this.select);

}
onSubmit(form: any) {

  console.log(form);

{
  var forms = {
    ...this.AddSubForm.value ,
    grade_id: localStorage.getItem("grade_id"),

  }

  this.TeacherService.AddSubItem(forms).subscribe((data) => {
    console.log(data );
this.alart=data;
      if (this.alart.status === false) {
        console.log("data falsee");

        Swal.fire({  title: '',
        position: 'top-end',
        text: this.alart.errors[0],
        icon: 'error',
        confirmButtonColor: '#4AB673',

      });      } else {
        console.log("data true");

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(()=>{
          this.AddSubForm.reset
          location.reload()
        } , 1000)
      }});

  // console.log( this.GradesList);



}

}
}
