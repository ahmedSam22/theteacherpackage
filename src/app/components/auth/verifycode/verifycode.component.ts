import {
  Component,
  ElementRef,
  Directive,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.scss'],
})
export class VerifycodeComponent implements OnInit {
  public submitted = false;

  @ViewChild('first') first!: ElementRef<HTMLInputElement>;
  @ViewChild('second') second!: ElementRef<HTMLInputElement>;
  @ViewChild('third') third!: ElementRef<HTMLInputElement>;
  @ViewChild('fourth') fourth!: ElementRef<HTMLInputElement>;

  public form: FormGroup | any;
  public togglePassword: boolean = false;
  phone: any = localStorage.getItem('reset');
  mail: any = localStorage.getItem('mail');
  fromPage: any;
  // @ViewChild("inputBox") _el: ElementRef;
  timeLeftMinutes: number = 23;

  interval: any;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: AuthenticationService,
    private spinner: NgxSpinnerService,
  ) {
    // if (this.service.currentUserValue) { this.router.navigate(['/']) }
    this.fromPage = window.location.href.toString().split('/').slice(-1);
  }
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      x: ['', Validators.required],
    });

    console.log(this.form.value);
    this.minutesTimer();
    // this.switchFocus()
  }

  minutesTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeftMinutes > 0) {
        this.timeLeftMinutes--;
      } else {
        this.timeLeftMinutes = 23;
      }
    }, 1000);
  }
  get f() {
    return this.form.controls;
  }
  submitSignup() {
    this.spinner.show();

    let country = JSON.parse(localStorage.getItem('CurrentUser') || '{}').data
      .user.country_code;
    let number = JSON.parse(localStorage.getItem('CurrentUser') || '{}').data
      .user.phone;

    this.submitted = true;
    if (this.form.invalid) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    this.spinner.show();

    const qq: FormData = new FormData();
    console.log(country + ' ' + number, 'henaaaaaaaa?');

    qq.append('email_or_phone', country + ' ' + number);
    qq.append('confirm_code', this.form.controls['x'].value);
    this.service.confirmVerify(qq).subscribe((response: any) => {
      console.log(response, 'test response');
      this.spinner.hide();
      if (response.status === false) {
        Swal.fire({
          title: '',
          text: response.errors[0],
          icon: 'error',
          confirmButtonColor: '#4AB673',
        });
      } else {
        Swal.fire('welcome');

        this.router.navigate(['/home']);
      }
    });
  }

  submitReset() {
    this.spinner.show();
    console.log(this.form.controls['x'].value, 'my form here');

    const qq: FormData = new FormData();

    qq.append('email_or_phone', this.phone);
    qq.append('confirm_code', this.form.controls['x'].value);
    this.service.confirmReset(qq).subscribe((response: any) => {
      console.log(response, 'test response');

      this.spinner.hide();

      if (response.status === false) {
        Swal.fire(` ?????? `, response.errors[0], `warning`);
      } else {
        Swal.fire(`verified`, `verified`, `success`);

        this.router.navigate(['/changepassword']);
      }
    });
  }

  submitMail() {

    let mail: any = this.mail;

    const qq: FormData = new FormData();

    qq.append('email_or_phone', mail);
    qq.append('confirm_code', this.form.controls['x'].value);
    this.service.confirmVerify(qq).subscribe((response: any) => {
      console.log(response, 'test response');

      this.spinner.hide();

      if (response.status === false) {
        Swal.fire(` ?????? `, response.errors[0], `warning`);
      } else {
        Swal.fire(`verified`, `verified`, `success`);

        this.router.navigate(['/home']);
      }
    });
  }

  resendCode() {
    const num: FormData = new FormData();
    if (this.fromPage == 'signup') {
      let country = JSON.parse(localStorage.getItem('CurrentUser') || '{}').data
        .user.country_code;
      let number = JSON.parse(localStorage.getItem('CurrentUser') || '{}').data
        .user.phone;
      num.append('email_or_phone', country + ' ' + number);
    } else if (this.fromPage == 'mail') {
      let mail: any = localStorage.getItem('mail') || '{}';

      num.append('email_or_phone', mail);
    }
    return this.service.verify(num).subscribe((e) => {
      alert('done');
    });
  }
  // setFocus() {
  //   this._el.nativeElement.focus();
  // }
  // ngAfterViewInit() {
  //   this._el.nativeElement.focus();
  // }
}
