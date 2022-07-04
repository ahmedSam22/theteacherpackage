import { TeacherService } from './../../teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './../../../../../../src/app/components/dialog/dialog.component';
@Component({
  selector: 'app-add-main-item',
  templateUrl: './add-main-item.component.html',
  styleUrls: ['./add-main-item.component.scss'],
})
export class AddMainItemComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private FormBuider: FormBuilder,
    private TeacherService: TeacherService,
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
      ...this.form.value ,
      grade_id:localStorage.getItem("grade_id"),
    }
    this.TeacherService.addDragetoClass(forms).subscribe((data) => {
      console.log(data);
    });
    console.log(forms);
location.reload();
  }
}
