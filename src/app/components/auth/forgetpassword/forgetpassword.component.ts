import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
 
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  public submitted = false;
  public form:FormGroup;
  public togglePassword: boolean = false;
  public togglePassword2: boolean = false;
  selectedCountryCode = 'sa';
  countryCodes = ['sa','us'];
  country_code="+966";
  imageSources;
  constructor(private router: Router,private formbuilder:FormBuilder,private service:AuthenticationService,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.imageSources = [
      {path: '../../../../assets/images/logo/login.png'},
      {path: '../../../../assets/images/logo/signup.png'},
      {path: '../../../../assets/images/logo/signup2.png'},
      
  ]
    this.form = this.formbuilder.group({
      email_or_phone:['',Validators.required],

    })
    console.log(this.form.value , "fortessssssssst")
    
  }
  get f() {return this.form.controls}
  sendCode(){
    let country = this.country_code
    let number = this.form.controls.email_or_phone.value

    let phone = `${country} ${number}`
    const formData: FormData = new FormData();
    formData.append("email_or_phone", phone);
    this.service.sendReset(formData).subscribe((response:any)=>{
      localStorage.setItem("reset" , phone)
      console.log(response ,"test response")
      this.spinner.hide()
   
        if(response.status === false){
          Swal.fire(
            ` فشللل `,
            response.errors[0],
            `warning`
            )
        }else{
              Swal.fire(
          `success `,
          `check your phone or email `,
          `success`
          )

          this.router.navigate(["/auth/verify/reset"]);
        }
    
        
    })

  }
  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }
  changeLang(){
     if(this.selectedCountryCode === "us"){
      this.country_code = "+1"
      console.log("us code", this.country_code )
    }
    else if(this.selectedCountryCode === "sa"){
      this.country_code = "+966"
      console.log("sa code", this.country_code )
    }
   
  }
}
