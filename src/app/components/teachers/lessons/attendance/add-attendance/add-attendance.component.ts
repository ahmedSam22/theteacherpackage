import { PublicService } from './../../../../../pubilc/public.service';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { TeacherService } from '../../../teacher.service';
import Swal from 'sweetalert2';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss'],
})
export class AddAttendanceComponent implements OnInit {
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
    public dialogRef: MatDialogRef<DialogComponent> 
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
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
      .createAttendance(this.form.value)
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

          // this.router.navigate(["/home"]);
          this.dialogRef.close(); 
        }
      });
    console.log(this.form.value);

    this.submitted = true;
  }
}
