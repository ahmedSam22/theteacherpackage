import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  public submitted = false;
  public form: FormGroup | any;
  public togglePassword: boolean = false;
  public togglePassword2: boolean = false;
  selectedCountryCode = "sa";
  countryCodes = ["sa", "us"];
  country_code = "sa";
  imageSources:any;
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
      { path: "../../../../assets/images/logo/login.png" },
      { path: "../../../../assets/images/logo/signup.png" },
      { path: "../../../../assets/images/logo/signup2.png" },
    ];
    this.form = this.formbuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      country_code: ["", Validators.required],
      phone: ["", Validators.required],
      password: ["", Validators.required],
      confirm_password: ["", Validators.required],
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
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    this.spinner.show();
    alert(this.form.controls.phone.value);
    this.service.signUp(this.form.value).subscribe((response: any) => {
      console.log(response, "test response");
      this.spinner.hide();

      if (response.status === false) {
        Swal.fire(` فشللل `, response.errors[0], `warning`);
      } else {
        Swal.fire(`signup success`, `signup success`, `success`);
        const qq: FormData = new FormData();
        console.log(country + " " + number, "henaaaaaaaa?");

        qq.append("email_or_phone", `${country} ${number}`);
        this.service.verify(qq).subscribe((e) => {
          console.log(e, "from verifyyyyyyyyy");
        });
        this.router.navigate(["/auth/verify/signup"]);
      }

      // this.router.navigate(["/home"])
    });
  }
  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }
  changeLang() {
    if (this.selectedCountryCode === "us") {
      this.form.controls.country_code.setValue("+1");
      console.log("us code", this.country_code);
    } else if (this.selectedCountryCode === "sa") {
      this.form.controls.country_code.setValue("+966");
      console.log("sa code", this.country_code);
    }
  }
}
