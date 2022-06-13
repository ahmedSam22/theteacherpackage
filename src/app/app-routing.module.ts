import { AppComponent } from './app.component';
// import { VerifycodeComponent } from './components/auth/verifycode/verifycode.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ForgetpasswordComponent } from './components/auth/forgetpassword/forgetpassword.component';
import { VerifycodeComponent } from './components/auth/verifycode/verifycode.component';
import { ChangepasswordComponent } from './components/auth/changepassword/changepassword.component';
import { ClassComponent } from './components/home/home.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { WeeklyscheduleComponent } from './components/weeklyschedule/weeklyschedule.component';
import { ClassStudentComponent } from './components/class-student/class-student.component';
import { ClassDetailsComponent } from './components/class-student/class-details/class-details.component';
// import { ChangepasswordComponent } from './components/auth/changepassword/changepassword.component';

const routes: Routes = [

  {path:'',component:LoginComponent},
  {path:'auth/signup',component:SignupComponent},
  {path:'auth/verify/:id',component:VerifycodeComponent},
  {path:'auth/forgetpassword',component:ForgetpasswordComponent},
  {path:'auth/changepassword',component:ChangepasswordComponent},

  {path:'home',component:DashboardLayoutComponent, children: [
    {path:'',component:ClassComponent},
    {path:'class-student',component:ClassStudentComponent , children: [
      {path:'details',component:ClassDetailsComponent},
      
      ]},
    {path:'reports',component:ReportsComponent},
    {path:'teachers',component:TeachersComponent},
    {path:'students',component:StudentsComponent},
    {path:'weekly-schedule',component:WeeklyscheduleComponent},
    ] },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
