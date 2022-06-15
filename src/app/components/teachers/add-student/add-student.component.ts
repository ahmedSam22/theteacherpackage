import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  form!:FormGroup;
  imgpath:any;
  base64Image:any ;
  file:File[]=[];
  showImg=true ;
  images : string[] = [];
  imagePath :string[]= [];
  @ViewChild("image") image: any;
 
  constructor(private router:Router , private route:ActivatedRoute ,private formbuilder:FormBuilder , ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      image: ['', Validators.required],
      gender: ['', Validators.required],
      guardian_name: ['', Validators.required],
      guardian_email: ['', Validators.required],
      guardian_phone: ['', Validators.required],
    });
  }
  back(){
    this.router.navigate(['../home/class-student/details']);
  }
  base64(event:any) {
    this.file= event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
    this.base64Image = reader.result;
     console.log("saasdswqadqwedwq",this.file[0])
    };
    this.showImg=false ;
  }
  onSubmit() {

  }
}
