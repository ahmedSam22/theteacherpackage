import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { VerifycodeComponent } from './components/auth/verifycode/verifycode.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
// import { WrongRouteComponent } from './components/auth/errors/wrong-route/wrong-route.component';
// import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
// import { ChangepasswordComponent } from './components/auth/changepassword/changepassword.component';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxFlagPickerModule } from 'ngx-flag-picker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // WrongRouteComponent,
    SignupComponent,
    // VerifycodeComponent,
    // ForgetpasswordComponent,
    // ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CommonModule,
    FormsModule,
    NgbModule,
    IvyCarouselModule,
    NgxSpinnerModule,
    NgxFlagPickerModule
    
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
