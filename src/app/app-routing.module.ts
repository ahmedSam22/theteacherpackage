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
// import { ChangepasswordComponent } from './components/auth/changepassword/changepassword.component';

const routes: Routes = [

  {path:'',component:LoginComponent},
  {path:'auth/signup',component:SignupComponent},
  {path:'auth/verify/:id',component:VerifycodeComponent},
  {path:'auth/forgetpassword',component:ForgetpasswordComponent},
  {path:'auth/changepassword',component:ChangepasswordComponent},
  {
    path: 'hh',
    // canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      // {path:'',component:HomeComponent, data: { title: 'الصفحة الرئيسية' }},
      {path:'home',component:AppComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
