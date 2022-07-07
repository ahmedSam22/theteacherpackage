import { PublicService } from './../../../../../pubilc/public.service';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { TeacherService } from '../../../teacher.service';
import Swal from 'sweetalert2';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.scss']
})
export class EditAttendanceComponent implements OnInit {
  public submitted = false;
  form!: FormGroup;
  imgpath: any;
  base64Image: any;
  file: File[] = [];
  showImg = true;
  images: string[] = [];
  colors: any[] = [];
  imagePath: string[] = [];

  student!: ElementRef;
  classname = 'active';
  selected: any;
  showStudentInfo: boolean = true;
  showGardianInfo: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private teacherservice: TeacherService,
    private elementRef: ElementRef,
    private pservice: PublicService,
    public dialogRef: MatDialogRef<DialogComponent> ,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      attendance_case_id: [this.data.id, Validators.required],
      name: [this.data.name, Validators.required],
      color: [this.data.color, Validators.required],
    });

    this.select('student');
    this.pservice.getAllColors().subscribe((res: any) => {
      this.colors = res.data;
      console.log(this.colors);
    });
  }

  setColor(selectedColor: any) {
    this.form.controls['color'].setValue(selectedColor);
  }

  back() {
    this.router.navigate(['../home/class-student/details']);
  }

  select(item: any) {
    this.selected = item;
    console.log('selllllected', this.selected);
  }
  isActive(item: any) {
    return this.selected === item;
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.teacherservice
      .updateAttendance(this.form.value)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === false) {
          Swal.fire({
            title: '',
            text: res.errors[0],
            icon: 'error',
            confirmButtonColor: '#4AB673',
          });
        } else {
          Swal.fire('class added successfully');

          this.dialogRef.close(); 
        }
      });
    console.log(this.form.value);

    this.submitted = true;
  }
}
