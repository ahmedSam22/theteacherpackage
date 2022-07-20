import { DialogGradeComponent } from './../dialog-grade/dialog-grade.component';
import { map } from 'rxjs';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeacherService } from '../../teacher.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-update-main-item',
  templateUrl: './update-main-item.component.html',
  styleUrls: ['./update-main-item.component.scss'],
})
export class UpdateMainItemComponent implements OnInit {
  id: any;
  grade_id = localStorage.getItem('grade_id');
  list: any[] = [];
  main: any;
  alart: any;
  isShown:string | undefined;


  alert: any;
  closeResult = '';
  // isShown: boolean= true;
  // disable:boolean= true;
    dynamicForm!: FormGroup;
  form!: FormGroup;
  AddSubForm!: FormGroup;
  course_id:any=localStorage.getItem("course_id");
  select: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teacher: TeacherService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogGradeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
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

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      localStorage.setItem("mainItemId" , this.id)
    });
    console.log(this.id);
  this.show()

  }
  show(){
    this.teacher.showMainItem(this.id, this.grade_id).subscribe((data: any) => {
      this.main = data.data;
      console.log(data);

      this.form = this.fb.group({
        title: [this.main.title, Validators.required],
        calculating_method: [this.main.calculating_method, Validators.required],
        total: [this.main.total, Validators.required],
      });
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

  // getSubItem(){

  //   }



  onSubmit(val: any) {
    console.log(val.value.subItems);
    // val.value.subItems=this.deleteSubItem(val.value.subItems)
    let forms = {
      grade_id: this.grade_id,
      grade_main_item_id: this.id,
      grade_sub_items: val.value.subItems,
      title: this.form.value.title,
      total:this.form.value.total
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
      grade_main_item_id: this.id,
      grade_sub_items: val.value.subItems,
    };
    console.log(forms );
    this.teacher.updateMianItem(forms).subscribe((data: any) => {
      console.log(data);
     this.alert=data
      if (this.alert.status === false) {
        Swal.fire({  title: '',
        position: 'top-end',
        text: this.alert.errors[0],
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
        grade_main_item_id: this.id,
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
