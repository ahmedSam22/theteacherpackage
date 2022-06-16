import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  public sortname=[] ; 
  public sortgender=[];
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem(`${environment.currentUserKey}`) || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    if (this.currentUserSubject.value != null) {
      return this.currentUserSubject.value;
    }
  }

  /* ----------classes -----------*/
  getAllClasses() {
    return this.http.get(`${environment.endpoint}/teacher/classes/all`);
  }

  getClassDetails(id: number) {
    return this.http.get(
      `${environment.endpoint}/teacher/class/show?class_id=${id}`
    );
  }

  classSearchByName(name: string) {
    return this.http.get(
      `${environment.endpoint}/teacher/class/search?class_name=${name}`
    );
  }

  createClass(form: any) {
    return this.http.post(`${environment.endpoint}/teacher/class/create`, form);
  }

  editClass(form: any) {
    return this.http.post(`${environment.endpoint}/teacher/class/update`, form);
  }

  deleteClass(id: number) {
    return this.http.get(
      `${environment.endpoint}/teacher/class/delete?class_id=${id}`
    );
  }

  /* ---------- students -----------*/

  importExcell(form: any) {
    return this.http.post(
      `${environment.endpoint}/teacher/students/import-excel`,
      form
    );
  }

  exportExcell() {
    return this.http.get(
      `${environment.endpoint}/teacher/students/export-excel`
    );
  }

  searchStudent(
    class_id: number,
    student_name?: string,
    gender?: number,
    code?: number
  ) {
    let searchParameters: string = `/teacher/students/search?class_id=${class_id}`;
    if (student_name) {
      searchParameters += `&student_name=${student_name}`;
    } else if (gender) {
      searchParameters += `&gender=${gender}`;
    } else if (code) {
      searchParameters += `&code=${code}`;
    }
    return this.http.get(`${environment.endpoint}${searchParameters}`);
  }

  sortStudents(
    class_id: number,
    student_name: number,
    gender: number,
    highest_degree: number
  ) {
    return this.http.get(
      `${environment.endpoint}/teacher/students/sort?class_id=${class_id}&name=${student_name}&gender=${gender}&highest_degree=${highest_degree}`
    );
  }

  getStudentDetails(id: number) {
    return this.http.get(
      `${environment.endpoint}/teacher/student/show?student_id=${id}`
    );
  }

  addStudentToClass(form: any) {
    return this.http.post(`${environment.endpoint}/teacher/student/add`, form);
  }

  updateStudent(form: any) {
    return this.http.post(
      `${environment.endpoint}/teacher/student/update`,
      form
    );
  }

  //   /teacher/student/delete?students_ids[0]=63&students_ids[1]=64&
  deleteStudent(...deletedId: [number]) {
    let deletedParameters: string = ``;
    for (let i = 0; i <= deletedId.length; i++) {
      deletedParameters += `students_ids[i]=${deletedId[i]}`;
    }
    return this.http.delete(
      `${environment.endpoint}/teacher/student/delete?${deletedParameters}`
    );
  }

  deleteAllClass(id: number) {
    return this.http.delete(
      `${environment.endpoint}/teacher/students/all/delete?class_id=${id}`
    );
  }

  getStudentDetailsInCourse(student_id: number, course_id: number) {
    return this.http.get(
      `${environment.endpoint}/teacher/student/course/details?student_id=${student_id}&course_id=${course_id}`
    );
  }
}
