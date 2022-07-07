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
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public getRefresh(): Observable<boolean> { return this.refresh.asObservable()}
  public setRefresh(value: boolean): void { this.refresh.next(value) } 
  public class_id:number=0;
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
    return this.http.delete(
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

  deleteStudent(...deletedId: [number]) {
    let deletedParameters: string = ``;
    for (let i = 0; i <= deletedId.length; i++) {
      deletedParameters += `students_ids[i]=${deletedId[i]}`;
    }
    return this.http.delete(
      `${environment.endpoint}/teacher/student/delete?${deletedParameters}`
    );
  }

  deleteAllClass(id:number) {
    return this.http.delete(
      `${environment.endpoint}/teacher/students/all/delete?class_id=${id}`
    );
  }

  getStudentDetailsInCourse(student_id: number, course_id: number) {
    return this.http.get(
      `${environment.endpoint}/teacher/student/course/details?student_id=${student_id}&course_id=${course_id}`
    );
  }

 /* ---------- Lessons -----------*/

 createLesson(form: any) {
  return this.http.post(`${environment.endpoint}/teacher/lesson/create`,form);
}
updateLesson(form:any){
  return this.http.post(`${environment.endpoint}/teacher/lesson/update`,form);
}

getLessonById(id:number){
  return this.http.get(`${environment.endpoint}/teacher/lesson/show?lesson_id=${id}`); 
}
 getWeeklySchedule() {
  return this.http.get(`${environment.endpoint}/teacher/weekly/schedule`);
}

getLessonsByDate(course_id:number,date:string){
  return this.http.get(`${environment.endpoint}/teacher/lessons/all?course_id=${course_id}&date=${date}`);
}
 
deleteLesson(id:number){
  return this.http.delete(`${environment.endpoint}/teacher/lesson/delete?lesson_id=${id}`);
}
 /* ---------- Attendance -----------*/

  getAllAttendanceCases(id:number){
  return this.http.get(`${environment.endpoint}/teacher/attendance/cases/all?lesson_id=${id}`);

  }

  getAllStudentAttendance(id:number){
    return this.http.get(`${environment.endpoint}/teacher/attendances/all?lesson_id=${id}`);
  
    }

    getAllAttendanceCount(id:number){
      return this.http.get(`${environment.endpoint}/teacher/attendance/count/show?lesson_id=${id}`);
    
      }

    


      assignAttendance(form:any){
        return this.http.post(`${environment.endpoint}/teacher/attendance/create`,form);
      }
      
      assignAllStudentAttendance(lesson_id:any,case_id:any){
        return this.http.get(`${environment.endpoint}/teacher/attendance/add/students/all?lesson_id=${lesson_id}&attendance_case_id=${case_id}`);
      }

      createAttendance(form:any){
        return this.http.post(`${environment.endpoint}/teacher/attendance/case/create`,form);
      }

      deleteAttendanceCase(id:any){
        return this.http.delete(`${environment.endpoint}/teacher/attendance/case/delete?attendance_case_id=${id}`);
      }

      updateAttendance(form:any){
        return this.http.post(`${environment.endpoint}/teacher/attendance/case/update`,form);
      }

  /* ---------- Behavior -----------*/
  getAllBehaviors(){
    return this.http.get(`${environment.endpoint}/teacher/behaviors/all`);
  }

  getBehaviorByClassId(course_id:number){
    return this.http.get(`${environment.endpoint}/teacher/students/behaviors?course_id=${course_id}`); 
  }

  createBehavior(form:any){
    return this.http.post(`${environment.endpoint}/teacher/behavior/create`,form);
  }

  updateBehavior(form:any){
    return this.http.post(`${environment.endpoint}/teacher/behavior/update`,form);
  }

  deleteBehavior(id:number){
    return this.http.delete(`${environment.endpoint}/teacher/behavior/delete?behavior_id=${id}`);
  }

  setNegativeBehaviorAlert(class_id:any,count_limit:any){
    return this.http.get(`${environment.endpoint}/teacher/behavior/set/alert-limit?class_id=${class_id}&negative_behaviors_count_limit=${count_limit}`);
  }

 addBehaviorToStudent(f:any){
  const formData:FormData = new FormData()
  console.log(f)
  formData.append('student_id',f.student_id)
  formData.append('course_id',f.course_id)
    for (let i = 0; i < f.behaviors_ids.length; i++) {
      formData.append('behaviors_ids['+i+']',f.behaviors_ids[i])
    }
    return this.http.post(`${environment.endpoint}/teacher/behavior/student/create`,formData);
  }

  deleteBehaviorFromStudent(student_id:number,behavior_id:number,course_id:number){
    return this.http.delete(`${environment.endpoint}/teacher/behavior/student/delete?student_id=${student_id}&behavior_id=${behavior_id}&course_id=${course_id}`);
  }

  getbehaviorByCourseId(course_id:number){
    return this.http.get(`${environment.endpoint}/teacher/students/behaviors?course_id=${course_id}`);
  }
  deleteBehaviorStudent(student_behavior_id:number){
    return this.http.delete(`${environment.endpoint}/teacher/behavior/student/delete?student_behavior_id=${student_behavior_id}`);
  }
}
