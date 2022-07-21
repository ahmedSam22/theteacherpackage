import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../components/auth/authentication.service';
// import { AuthenticationService } from '../components/auth/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService,private toastr: ToastrService,private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
      
            this.spinner.hide()
            switch (err.status) {
                case 401:
                        this.toastr.error('ليس لديك صلاحيات',err.error.message);  
                    break;
                    case 404:
                        this.toastr.error(err.error.message);  
                    break;
                case 500:
                    this.toastr.error(
                    'حدث خطأ غير معروف. حاول لاحقًا','خطأ تقني');  
                    break;
              
                default:
                    err.error.messages.forEach((error:any) => {
                        this.toastr.error('يرجي التأكد من ادخال بيانات صحيحه',error);  
                    });
                 
                    break;
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}