import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public submitted = false;
  public form:FormGroup | any;
  public togglePassword: boolean = false;
  imageSources:any;
  constructor(private router: Router,private formbuilder:FormBuilder,private service:AuthenticationService,private spinner: NgxSpinnerService) { 
    // if (this.service.currentUserValue) { this.router.navigate(['/']) }
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email_or_phone:['',Validators.required],
      password:['',Validators.required] 
    })
    console.log(this.form.value)
    this.imageSources = [
      {path: '../../../../assets/images/logo/login.png'},
      {path: '../../../../assets/images/logo/signup.png'},
      {path: '../../../../assets/images/logo/signup2.png'},
      
  ]
  }
  get f() {return this.form.controls}
  submit(){
    this.submitted = true;
    if (this.form.invalid) { 
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });return 
    }
    console.log(this.form.value  ,"henaaaaaaaa?")
    this.spinner.show()
    this.service.login(this.form.value).subscribe((response:any)=>{
      console.log(response ,"test response")
      this.spinner.hide()
   
        if(response.status === false){
          Swal.fire(
            ` فشللل `,
            response.errors[0],
            `warning`
            )
            if(response.errors[0] == 'email is not verified'){
              localStorage.setItem("mail",this.form.controls["email_or_phone"].value)
              const qq: FormData = new FormData();
      
              qq.append("email_or_phone", this.form.controls["email_or_phone"].value);
              this.service.verify(qq).subscribe((e) => {
              console.log(e, "from verifyyyyyyyyy");
              
            });
            this.router.navigate(['/auth/verify/mail'])
            }

        }else{
          Swal.fire(
          `نجاح تسجيل الدخول`,
          `مرحباً بعودتك, يا أدمن`,
          `success`
          )
          this.router.navigate(["/home"])
        }
    
    })
    // this.service.login(this.form.value).subscribe((response:any)=>{
    //   console.log(response)
    //   console.log(response)

        // })
  }
}
