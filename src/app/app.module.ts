import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { VerifycodeComponent } from './components/auth/verifycode/verifycode.component';
import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { ChangepasswordComponent } from './components/auth/changepassword/changepassword.component';
import { ClassComponent } from './components/home/home.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StudentsComponent } from './components/students/students.component';
import { WeeklyscheduleComponent } from './components/weeklyschedule/weeklyschedule.component';
import { ClassStudentComponent } from './components/teachers/class-student/class-student.component';
import { ClassDetailsComponent } from './components/teachers/class-student/class-details/class-details.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
 
import { AddStudentComponent } from './components/teachers/add-student/add-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddClassComponent } from './components/teachers/class-student/add-class/add-class.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ClassScheduleComponent } from './components/teachers/class-student/class-schedule/class-schedule.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AddComponent } from './components/teachers/lessons/add/add.component';
import { EditComponent } from './components/teachers/lessons/edit/edit.component';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
  // import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
  import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BehaviorComponent } from './components/teachers/class-student/behavior/behavior.component';
import { EditClassComponent } from './components/teachers/class-student/edit-class/edit-class.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // WrongRouteComponent,
    SignupComponent,
    VerifycodeComponent,
    ForgetpasswordComponent,
    ChangepasswordComponent,
    ClassComponent,
    ReportsComponent,
    TeachersComponent,
    StudentsComponent,
    WeeklyscheduleComponent,
    ClassStudentComponent,
    ClassDetailsComponent,
    AddStudentComponent,
    AddClassComponent,
    ClassScheduleComponent,
    DialogComponent,
    AddComponent,
    EditComponent,
    BehaviorComponent,
    EditClassComponent,
 
 
   
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
    NgxFlagPickerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    TimePickerModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
