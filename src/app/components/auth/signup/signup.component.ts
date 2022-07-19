import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
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
  public form: FormGroup | any;
  public togglePassword: boolean = false;
  public togglePassword2: boolean = false;
  selectedCountryCode = 'sa';
  countryCodes = ['sa', 'us'];
  // selectedCountryCode = 'us';
  // countryCodes = ['us', 'lu', 'de', 'bs', 'br', 'pt'];
  country_code = 'sa';
  imageSources: any;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {
    // if (this.service.currentUserValue) { this.router.navigate(['/']) }
  }

  ngOnInit(): void {
    this.imageSources = [
      { path: '../../../../assets/images/logo/login.png' },
      { path: '../../../../assets/images/logo/signup.png' },
      { path: '../../../../assets/images/logo/signup2.png' },
    ];
    this.form = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      country_code: ['+966', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
    console.log(this.form.value);
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    let country = this.form.controls.country_code.value;
    let number = this.form.controls.phone.value;

    this.submitted = true;
    if (this.form.invalid) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    this.spinner.show();
    this.service.signUp(this.form.value).subscribe((response: any) => {
      console.log('==================####=================')
      console.log(response)
      this.spinner.hide();
      if (response.status === false) {
        Swal.fire({
          title: '',
          text: response.errors[0],
          icon: 'error',
          confirmButtonColor: '#4AB673',
        });
      } else {
        Swal.fire(`signup success`, `signup success`, `success`);
        const qq: FormData = new FormData();
        qq.append('email_or_phone', `${country} ${number}`);
        // this.service.verify(qq).subscribe((e) => {
        //   console.log(e, 'from verifyyyyyyyyy');
        // });
        this.router.navigate(['/auth/verify/signup']);
      }

      // this.router.navigate(["/home"])
    });
  }
  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }
  // changeSelectedCountryCode(value: string): void {
  //   this.selectedCountryCode = value;
  // }
  changeLang() {
    if (this.selectedCountryCode === 'us') {
      this.form.controls.country_code.setValue('+1');
      console.log('us code', this.form.value.country_code);
    } else if (this.selectedCountryCode === 'sa') {
      this.form.controls.country_code.setValue('+966');
      console.log('sa code', this.form.value.country_code);
    }
  }

  googleLogin() {
    return this.service.GoogleAuth().then((_) => {
      this.router.navigate(['/home']);
    });
  }

  facebookLogin() {
    return this.service.FacebookAuth().then((_) => {
      this.router.navigate(['/home']);
    });
  }
}
