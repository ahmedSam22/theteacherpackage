import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { TeacherService } from './../teachers/teacher.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditClassComponent } from '../teachers/class-student/edit-class/edit-class.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class ClassComponent implements OnInit {
  public allClasses: any;
  hideClass!: boolean;
  showClass!: boolean;
  searchParam: string = 'search';
   

  constructor(
    private teacherservice: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    private service: TeacherService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllClasses();
     localStorage.removeItem('showschedule');
     localStorage.removeItem('showBehavior');
     localStorage.removeItem('showstudents');
 
  }

  getAllClasses() {
    this.service.getAllClasses().subscribe((res: any) => {
      this.allClasses = res['data'];
      console.log('all classess', this.allClasses);
      if (this.allClasses.length == 0) {
        // this.hideClass=true ;
        this.showClass = false;
      } else {
        // this.hideClass=false ;
        this.showClass = true;
      }
    });
  }


  editClass(lesson:any): void {
    const dialogRef = this.dialog.open(EditClassComponent, {
      data:lesson,
    })};

  deleteClass(classId: any) {
    this.service.deleteClass(classId).subscribe((res: any) => {
      this.getAllClasses();
    });
  }

  goToStudents(class_id: any) {
    this.teacherservice.class_id = class_id;
    localStorage.setItem('class_id', class_id);
    console.log('service', this.teacherservice.class_id);
    this.router.navigate(['../home/class-student', this.searchParam]);
  }
}
