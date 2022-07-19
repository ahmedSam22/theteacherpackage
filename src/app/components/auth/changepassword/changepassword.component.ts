import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2'
import { OwlOptions } from 'ngx-owl-carousel-o';
 
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  customOptions: OwlOptions = {
    items : 1,
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    center : true,
    slideBy : 1,
    dots : true,
    pullDrag: false,
    // dots: false,
    navSpeed: 700,
    // navText : ["hide"],
    responsive: {
      0: {
        // items: 1
      },
      400: {
        // items: 2
      },
      740: {
        // items: 3
      },
      940: {
        // items: 4
      }
    },
    nav: true
  }
  public submitted = false;
  public form:FormGroup | any;
  public togglePassword: boolean = false;
  public togglePassword2: boolean = false;
  selectedCountryCode = 'sa';
  countryCodes = ['sa','us'];
  country_code="";
  imageSources:any;
  constructor(private router: Router,private formbuilder:FormBuilder,private service:AuthenticationService,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.imageSources = [
      {path: '../../../../assets/images/logo/login.png'},
      {path: '../../../../assets/images/logo/signup.png'},
      {path: '../../../../assets/images/logo/signup2.png'},
      
  ]
    this.form = this.formbuilder.group({
      email_or_phone:[localStorage.getItem("reset"),Validators.required] ,
      new_password:['',Validators.required] ,
      confirm_new_password:['',Validators.required] ,

    })
  }
  get f() {return this.form.controls}
  submit(){
    
    console.log(this.form.value)
    this.service.resetPassword(this.form.value).subscribe((response:any)=>{
      console.log(response ,"test response")
      this.spinner.hide()
   
        if(response.status === false){
          Swal.fire({  title: '',
          text: response.errors[0],
          icon: 'error',
          confirmButtonColor: '#4AB673',
  
        });
        }else{
              Swal.fire(
          `password changed`,
          `password changed success`,
          `success`
          )
          this.router.navigate(["/"])
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
