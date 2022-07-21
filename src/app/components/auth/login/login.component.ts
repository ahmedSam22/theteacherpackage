import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public submitted = false;
  public form:FormGroup | any;
  public togglePassword: boolean = false;
<<<<<<< HEAD
  imageSources:any;
  constructor(private router: Router,private formbuilder:FormBuilder,private service:AuthenticationService,private spinner: NgxSpinnerService) {
    // if (this.service.currentUserValue) { this.router.navigate(['/']) }
=======
  public sliderItems = [
    {
      title:'recording the attendance and absence if students',
      path: 'assets/images/strory1/Social distance at school-cuate.png'
    },
    {
      title:'sending students name to another teacher',
      path: 'assets/images/strory1/login.png'
    },
    {
      title:'send questions and tasks and correct them automatically',
      path: 'assets/images/strory1/Group 71400.png'
    },
  ]
  public sliderOptions : OwlOptions = {
    items : 1,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    center : true,
    slideBy : 1,
    dots : true,
    pullDrag: false,
    navSpeed: 700,
    nav: false
  }

  constructor(private router: Router,private formbuilder:FormBuilder,private service:AuthenticationService,private spinner: NgxSpinnerService) { 
    if (this.service.currentUserValue) { this.router.navigate(['/']) }
>>>>>>> 5d70d547cdf198412df55168cc040ac1a728f122
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email_or_phone:['',Validators.required],
      password:['',Validators.required]
    })
<<<<<<< HEAD
    console.log(this.form.value)
    this.imageSources = [
      {path: '../../../../assets/images/logo/login.png'},
      {path: '../../../../assets/images/logo/signup.png'},
      {path: '../../../../assets/images/logo/signup2.png'},

  ]
=======
>>>>>>> 5d70d547cdf198412df55168cc040ac1a728f122
  }

  get f() {return this.form.controls}
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });return
    }
    this.spinner.show()
    this.service.login(this.form.value).subscribe((response:any)=>{
      console.log(response)
      console.log(response)
      console.log(response)
      console.log(response)
      this.spinner.hide()
<<<<<<< HEAD

=======
      // dev.elsawy2@gmail.com
>>>>>>> 5d70d547cdf198412df55168cc040ac1a728f122
        if(response.status === false){
          debugger
          // Swal.fire({  
          //   title: '',
          //   text: response.errors[0],
          //   icon: 'error',
          //   confirmButtonColor: '#4AB673',
          // });
          
            if(response.errors[0] == 'email is not verified'){
              localStorage.setItem("mail",this.form.controls["email_or_phone"].value)
<<<<<<< HEAD
              const qq: FormData = new FormData();

              qq.append("email_or_phone", this.form.controls["email_or_phone"].value);
              this.service.verify(qq).subscribe((e) => {
              console.log(e, "from verifyyyyyyyyy");

            });
=======
              const formData: FormData = new FormData();
              formData.append("email_or_phone", this.form.controls["email_or_phone"].value);

              this.service.verify(formData).subscribe((e) => {
              });
>>>>>>> 5d70d547cdf198412df55168cc040ac1a728f122
            this.router.navigate(['/auth/verify/mail'])
            }

        }else{
          Swal.fire(
          `login successful`,
          ``,
          `success`
          )
          this.router.navigate(["/home"])
        }

    })
  }

  googleLogin(){
<<<<<<< HEAD
    return this.service.GoogleAuth().then(_=>{
      this.router.navigate(["/home"])
       });

=======
    return this.service.GoogleAuth().then(_=>{ this.router.navigate(["/home"]) });
>>>>>>> 5d70d547cdf198412df55168cc040ac1a728f122
  }

  facebookLogin(){
<<<<<<< HEAD
    return this.service.FacebookAuth().then(_=>{
      this.router.navigate(["/home"])
       });

=======
    return this.service.FacebookAuth().then(_=>{ this.router.navigate(["/home"]) });
>>>>>>> 5d70d547cdf198412df55168cc040ac1a728f122
  }
}
