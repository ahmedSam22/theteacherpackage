import { AddClassComponent } from './components/teachers/class-student/add-class/add-class.component';
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
import { ReportsComponent } from './components/teachers/reports/reports.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teacher-main/teachers.component';
import { WeeklyscheduleComponent } from './components/weeklyschedule/weeklyschedule.component';
import { ClassStudentComponent } from './components/teachers/class-student/class-student.component';
import { ClassDetailsComponent } from './components/teachers/class-student/class-details/class-details.component';
import { AddStudentComponent } from './components/teachers/add-student/add-student.component';
import { ClassScheduleComponent } from './components/teachers/class-student/class-schedule/class-schedule.component';
   
// import { ChangepasswordComponent } from './components/auth/changepassword/changepassword.component';

const routes: Routes = [

  {path:'',component:LoginComponent},
  {path:'auth/signup',component:SignupComponent},
  {path:'auth/verify/:id',component:VerifycodeComponent},
  {path:'auth/forgetpassword',component:ForgetpasswordComponent},
  {path:'auth/changepassword',component:ChangepasswordComponent},
  
  {path:'home',component:DashboardLayoutComponent, 
  // canActivateChild: [],
  children: [
    {path:'',component:ClassComponent},
    {path:'class-student',component:ClassStudentComponent , children:[
      {path:'class-schedual',component:ClassScheduleComponent},
      {path:':search',component:ClassDetailsComponent},
    ]},  
    {path:'class-student-add',component:AddStudentComponent},
    {path:'class-add',component:AddClassComponent},
 
    {path:'reports',component:ReportsComponent},
    {path:'teachers',component:TeachersComponent},
    {path:'students',component:StudentsComponent},
    {path:'weekly-schedule',component:WeeklyscheduleComponent},
     
    ] },
 
];
// {path:'student/:id',component: },
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
