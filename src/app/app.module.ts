import { AssignAttendanceComponent } from './components/teachers/lessons/attendance/assign-attendance/assign-attendance.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ClassComponent } from './components/home/home.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StudentsComponent } from './components/students/students.component';
import { WeeklyscheduleComponent } from './components/weeklyschedule/weeklyschedule.component';
import { ClassStudentComponent } from './components/teachers/class-student/class-student.component';
import { ClassDetailsComponent } from './components/teachers/class-student/class-details/class-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
 import{ MatCheckboxModule }from '@angular/material/checkbox';
import { AddStudentComponent } from './components/teachers/add-student/add-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddClassComponent } from './components/teachers/class-student/add-class/add-class.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ClassScheduleComponent } from './components/teachers/class-student/class-schedule/class-schedule.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AddComponent } from './components/teachers/lessons/add/add.component';
import { EditComponent } from './components/teachers/lessons/edit/edit.component';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BehaviorComponent } from './components/teachers/class-student/behavior/behavior.component';
import { AddStudentBehaviorComponent } from './components/teachers/add-student-behavior/add-student-behavior.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { BehaviorSettingComponent } from './components/teachers/behavior-setting/behavior-setting.component';
import { EditClassComponent } from './components/teachers/class-student/edit-class/edit-class.component';
import { AttendanceComponent } from './components/teachers/lessons/attendance/attendance.component';
import { SettingsComponent } from './components/teachers/lessons/attendance/settings/settings.component';
import { AddAttendanceComponent } from './components/teachers/lessons/attendance/add-attendance/add-attendance.component';
import { EditAttendanceComponent } from './components/teachers/lessons/attendance/edit-attendance/edit-attendance.component';
import { AssignAllAttendanceComponent } from './components/teachers/lessons/attendance/assign-all-attendance/assign-all-attendance.component';
import { ResponseInterceptor } from './helpers/response.interceptor';
 
@NgModule({
  declarations: [
    AppComponent,
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
    PromptComponent,
    BehaviorSettingComponent,
    AddStudentBehaviorComponent,
    EditClassComponent,
    AttendanceComponent,
    AssignAttendanceComponent,
    SettingsComponent,
    AddAttendanceComponent,
    EditAttendanceComponent,
    AssignAllAttendanceComponent,
    
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    TimePickerModule,
    NgxMaterialTimepickerModule,
  
    // AuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
