import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifycodeComponent } from './verifycode/verifycode.component';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { NgOtpInputModule } from  'ng-otp-input';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent,
    // WrongRouteComponent,
    SignupComponent,
    VerifycodeComponent,
    ForgetpasswordComponent,
    ChangepasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxFlagPickerModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    // NgOtpInputModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers:[]
})
export class AuthModule { }
