import { DialogSubItemsComponent } from './../dialog-sub-items/dialog-sub-items.component';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TeacherService } from '../../teacher.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-sub-items-without-main',
  templateUrl: './update-sub-items-without-main.component.html',
  styleUrls: ['./update-sub-items-without-main.component.scss']
})
export class UpdateSubItemsWithoutMainComponent implements OnInit {
  dynamicForm!: FormGroup;
  AddSubForm!: FormGroup;
  list: any;
  main: any;
  grade_id = localStorage.getItem('grade_id');
  mainId:any=-1
  alart: any;
  constructor(  private teacher: TeacherService,
    private fb: FormBuilder,
    public dialog: MatDialog , private router:Router) { }

  ngOnInit(): void {
    this.AddSubForm = this.fb.group({
      evaluation_item_name: [''],
      evaluation_item_data_type: [''],
      first_option: [''],
      second_option: ['' ],
    });
    this.dynamicForm = this.fb.group({
      subItems: new FormArray([]),
    });
    this.show()
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogSubItemsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  show(){
    this.teacher.showMainItem(this.mainId, this.grade_id).subscribe((data: any) => {
      this.main = data.data;
      console.log(data);


      console.log(data);
      this.list = data.data.grade_sub_items;
      console.log(this.list);
      for (let index = 0; index < this.list.length; index++) {

        this.sub.push(
          this.fb.group({
            id: [this.list[index].id, Validators.required],
            evaluation_item_name: [
              this.list[index].evaluation_item_name,
              Validators.required,
            ],
            evaluation_item_data_type: [
              this.list[index].evaluation_item_data_type,
            ],
            first_option: [this.list[index].first_option],
            second_option: [this.list[index].second_option],
          })
        );
      }
      console.log(this.dynamicForm.value.subItems);

    });
  }
  get f() {
    return this.dynamicForm.controls;
  }
  get sub() {
    return this.f['subItems'] as FormArray;
  }
  get SubItems() {
    return this.sub.controls as FormGroup[];
  }
  onSubmit(val: any) {
    console.log(val.value.subItems);
    // val.value.subItems=this.deleteSubItem(val.value.subItems)
    let forms = {
      grade_id: this.grade_id,
      grade_main_item_id: this.mainId,
      grade_sub_items: val.value.subItems,

    };
    console.log(forms );
    this.teacher.updateMianItem(forms).subscribe((data: any) => {
      console.log(data);
    });

  }
  back() {
    this.router.navigate(['./../../../home/class-student/class-grade']);
  }

  deleteSubItem(val: any,item:any){
    console.log(item);

    const indexOfObject = val.value.subItems.findIndex( (object:any) => {
      return object === item.value;


    });


    console.log(indexOfObject ); // 👉️ 1

    val.value.subItems.splice(indexOfObject, 1);

    console.log(val.value.subItems);
    let forms = {
      grade_id: this.grade_id,
      grade_main_item_id: this.mainId,
      grade_sub_items: val.value.subItems,
    };
    console.log(forms );
    this.teacher.updateMianItem(forms).subscribe((data: any) => {
      console.log(data);
     this.alart=data
      if (this.alart.status === false) {
        Swal.fire({  title: '',
        position: 'top-end',
        text: this.alart.errors[0],
        icon: 'error',
        confirmButtonColor: '#4AB673',

      });      } else {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })

      }

    });



  }
  addSubitem(){

      var forms = {
        ...this.AddSubForm.value ,
        grade_id: this.grade_id,
        grade_main_item_id:this.mainId,
      }

     this.teacher.AddSubItem(forms).subscribe((data) => {
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
          this.ngOnInit()
        }});
  }

}
