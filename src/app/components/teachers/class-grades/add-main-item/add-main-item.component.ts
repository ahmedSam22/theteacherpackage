import { TeacherService } from './../../teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './../../../../../../src/app/components/dialog/dialog.component';
import Swal from 'sweetalert2';
import { reload } from 'firebase/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-main-item',
  templateUrl: './add-main-item.component.html',
  styleUrls: ['./add-main-item.component.scss'],
})
export class AddMainItemComponent implements OnInit {
  form!: FormGroup;
  alert: any;
  showGradeList: any = '';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private FormBuider: FormBuilder,
    private TeacherService: TeacherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.FormBuider.group({
      title: ['', Validators.required],
      calculating_method: ['', Validators.required],
      total: ['', Validators.required],
    });
  }

  onSubmit(form: any) {
    console.log(form);
    let forms = {
      ...this.form.value,
      grade_id: localStorage.getItem('grade_id'),
    };
    this.TeacherService.addDragetoClass(forms).subscribe((data) => {
      console.log(data);
      this.alert = data;
      if (this.alert.status === false) {
        Swal.fire({
          title: '',
          position: 'top-end',
          text: this.alert.errors[0],
          icon: 'error',
          confirmButtonColor: '#4AB673',
        });
      } else {
        this.onNoClick();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });

        this.showGradeList = localStorage.setItem('GradesList', 'true');
        this.router
          .navigate(['./../../../home/class-student/class-grade/grade-details'])
          .then(() => {});
      }
    });
    console.log(forms);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
