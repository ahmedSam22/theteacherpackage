import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
@Component({
  selector: "app-verifycode",
  templateUrl: "./verifycode.component.html",
  styleUrls: ["./verifycode.component.scss"],
})
export class VerifycodeComponent implements OnInit {
  public submitted = false;
  public form: FormGroup | any;
  public togglePassword: boolean = false;
  fromPage:any;
  // @ViewChild("inputBox") _el: ElementRef;
  timeLeftMinutes: number = 23;

  interval: any;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private service: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {
    // if (this.service.currentUserValue) { this.router.navigate(['/']) }
    this.fromPage = window.location.href.toString().split("/").slice(-1);
  }
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      x: ["", Validators.required],
      y: ["", Validators.required],
      z: ["", Validators.required],
      m: ["", Validators.required],
    });

    console.log(this.form.value);
    this.minutesTimer();
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
    let country = JSON.parse(localStorage.getItem("CurrentUser") || "{}").data.user
      .country_code;
    let number = JSON.parse(localStorage.getItem("CurrentUser") || "{}").data.user
      .phone;
    let code = [
      this.form.controls.x.value,
      this.form.controls.y.value,
      this.form.controls.z.value,
      this.form.controls.m.value,
    ].join("");

    this.submitted = true;
    if (this.form.invalid) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    this.spinner.show();

    const qq: FormData = new FormData();
    console.log(country + " " + number, "henaaaaaaaa?");

    qq.append("email_or_phone", country + " " + number);
    qq.append("confirm_code", code);
    this.service.confirmVerify(qq).subscribe((response: any) => {
      console.log(response, "test response");
      this.spinner.hide();
      if (response.status === false) {
        Swal.fire(` فشللل `, response.errors[0], `warning`);
      } else {
        Swal.fire(`نجاح تسجيل الدخول`, `مرحباً بعودتك, يا أدمن`, `success`);
     
        this.router.navigate(["/home"]);
      }
    });
  }

  submitReset() {
   let phone:any = localStorage.getItem("reset")
    let code = [
      this.form.controls.x.value,
      this.form.controls.y.value,
      this.form.controls.z.value,
      this.form.controls.m.value,
    ].join("");

    const qq: FormData = new FormData();

    qq.append("email_or_phone", phone);
    qq.append("confirm_code", code);
    this.service.confirmReset(qq).subscribe((response: any) => {
      console.log(response, "test response");

      this.spinner.hide();

      if (response.status === false) {
        Swal.fire(` فشللل `, response.errors[0], `warning`);
      } else {
        Swal.fire(`verified`, `verified`, `success`);
     
        this.router.navigate(["/auth/changepassword"]);
      }
    });
  }

  
  submitMail() {
    let mail:any = localStorage.getItem("mail") || "{}"
     let code = [
       this.form.controls.x.value,
       this.form.controls.y.value,
       this.form.controls.z.value,
       this.form.controls.m.value,
     ].join("");
 
     const qq: FormData = new FormData();
 
     qq.append("email_or_phone", mail);
     qq.append("confirm_code", code);
     this.service.confirmVerify(qq).subscribe((response: any) => {
       console.log(response, "test response");
 
       this.spinner.hide();
 
       if (response.status === false) {
         Swal.fire(` فشللل `, response.errors[0], `warning`);
       } else {
         Swal.fire(`verified`, `verified`, `success`);
      
         this.router.navigate(["/"]);
       }
     });
   }

  // setFocus() {
  //   this._el.nativeElement.focus();
  // }
  // ngAfterViewInit() {
  //   this._el.nativeElement.focus();
  // }
}
