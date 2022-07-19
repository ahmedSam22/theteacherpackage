import { SettingsComponent } from './components/teachers/lessons/attendance/settings/settings.component';
import { AttendanceComponent } from './components/teachers/lessons/attendance/attendance.component';
import { EditClassComponent } from './components/teachers/class-student/edit-class/edit-class.component';
import { AddClassComponent } from './components/teachers/class-student/add-class/add-class.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ClassComponent } from './components/home/home.component';
import { ReportsComponent } from './components/teachers/reports/reports.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teacher-main/teachers.component';
import { WeeklyscheduleComponent } from './components/weeklyschedule/weeklyschedule.component';
import { ClassStudentComponent } from './components/teachers/class-student/class-student.component';
import { ClassDetailsComponent } from './components/teachers/class-student/class-details/class-details.component';
import { AddStudentComponent } from './components/teachers/add-student/add-student.component';
import { ClassScheduleComponent } from './components/teachers/class-student/class-schedule/class-schedule.component';
import { AddComponent } from './components/teachers/lessons/add/add.component';
import { BehaviorComponent } from './components/teachers/class-student/behavior/behavior.component';
import { BehaviorSettingComponent } from './components/teachers/behavior-setting/behavior-setting.component';
import { AuthModule } from './components/auth/auth.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => AuthModule
  },

  {
    path: 'home',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: ClassComponent },
      {
        path: 'class-student',
        component: ClassStudentComponent,
        children: [
          { path: 'class-schedual', component: ClassScheduleComponent },
          { path: 'class-behavior', component: BehaviorComponent },
          { path: 'lesson-attendance', component: AttendanceComponent },

          { path: ':search', component: ClassDetailsComponent },
        ],
      },
      { path: 'class-student-add', component: AddStudentComponent },
      { path: 'class-lesson-add', component: AddComponent },
      { path: 'class-add', component: AddClassComponent },
      { path: 'class-edit', component: EditClassComponent },
      {path : 'behavior-setting' , component:BehaviorSettingComponent},
      {path : 'attendance-setting' , component:SettingsComponent},
      { path: 'reports', component: ReportsComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'weekly-schedule', component: WeeklyscheduleComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
