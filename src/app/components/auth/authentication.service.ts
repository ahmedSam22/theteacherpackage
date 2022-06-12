import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { GoogleAuthProvider } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router, private http: HttpClient, public afAuth: AngularFireAuth) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem(`${environment.currentUserKey}`) || "{}")
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    if (this.currentUserSubject.value != null) {
      return this.currentUserSubject.value;
    }
  }
  login(form:any) {
    const formData: FormData = new FormData();
    formData.append("email_or_phone", form.email_or_phone);
    formData.append("password", form.password);
    return this.http
      .post(`${environment.endpoint}/teacher/signin`, formData)
      .pipe(
        map((user?: any) => {
          console.log("userrrrrrrr", user);
          console.log(user);
          console.log(user);
          console.log(user);
          if (user && user.data?.access_token) {
            localStorage.setItem(
              `${environment.currentUserKey}`,
              JSON.stringify(user)
            );
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  signUp(form:any) {
    const formData: FormData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("country_code", form.country_code);
    formData.append("phone", form.phone);
    formData.append("password", form.password);
    formData.append("confirm_password", form.confirm_password);

    return this.http
      .post(`${environment.endpoint}/teacher/signup`, formData)
      .pipe(
        map((user: any) => {
          console.log("sign up user", user);
          console.log(user);
          console.log(user);
          console.log(user);

          if (user && user.data?.access_token) {
            localStorage.setItem(
              `${environment.currentUserKey}`,
              JSON.stringify(user)
            );
      this.verify(`0096 ${form.phone}`)
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  verify(form:any) {
    return this.http
      .post(`${environment.endpoint}/sms/send`, form)
      .pipe(
        map((user?: any) => {

          return user;
        })
      );
      
  }
  confirmVerify(form:any) {
    return this.http
      .post(`${environment.endpoint}/sms/confirm`, form)
      .pipe(
        map((user?: any) => {

          return user;
        })
      );
      
  }
  sendReset(form:any){
    return this.http
    .post(`${environment.endpoint}/reset/sms/send`, form)
    .pipe(
      map((user?: any) => {

        return user;
      })
    );
  }
  confirmReset(form:any){
    return this.http
    .post(`${environment.endpoint}/reset/sms/confirm`, form)
    .pipe(
      map((user?: any) => {

        return user;
      })
    );
  }

  resetPassword(form:any){
    return this.http
    .post(`${environment.endpoint}/reset/password`, form)
    .pipe(
      map((user?: any) => {

        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem(`${environment.currentUserKey}`);
    this.currentUserSubject.next(null);
    this.router.navigate([""]);
  }

  
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());

  }


  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result , 'You have been successfully logged in!');
        let uid:any = result.user?.uid;
        let name:any = result.user?.displayName;
        let email:any = result.user?.email;
        let phone:any = result.user?.phoneNumber;
        let photo:any = result.user?.photoURL;

        const formControl: FormData = new FormData();
        formControl.append("uid" , uid)
        formControl.append("name" , name)
        formControl.append("email" , email)
        formControl.append("phone" , phone)
        formControl.append("image" , photo)
        // formControl.append("phone" , phone)
        this.forSocial(formControl).subscribe(res=>{
          console.log(res);
          
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }



  forSocial(form:any) {

    return this.http
      .post(`${environment.endpoint}/social/signin`, form)
      .pipe(
        map((user?: any) => {
          console.log("userrrrrrrr", user);

          if (user && user.data?.access_token) {
            localStorage.setItem(
              `${environment.currentUserKey}`,
              JSON.stringify(user)
            );
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

}
