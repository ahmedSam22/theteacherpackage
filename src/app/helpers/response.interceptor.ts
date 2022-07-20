
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private spinner:NgxSpinnerService){}
    intercept(req: any, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(req).pipe(
        //     tap(
        //       event => { 
        //         if (event instanceof HttpResponse)
        //           console.log('request succeeded');
        //           console.log(event)
        //       },
        //       error => {
        //         if (error instanceof HttpErrorResponse) {
        //           console.log('request failed');
        //         }
        //       }
        //     ));
        return next.handle(req).pipe(map((event: any) => {
            if (event instanceof HttpResponse) {
                event = event.clone({body: this.modifyBody(event.body)});      
                console.log(event.body)
                this.spinner.hide()
                return of(new HttpResponse({
                    body: {data: null},
                    status: 500
                  }))

            }
            
            return event;
        }));


    }

    private modifyBody(body: any) {
        // if(body.hasOwnProperty('errors')){
        //     body['status'] =  500
        //     body['statusText'] =  "NO"
        //     console.log(new Error(body))
        // }
       
          
        if(body.hasOwnProperty('errors')){
            body.errors.forEach((error:any) => {
                Swal.fire({  
                    title: '',
                    text: error,
                    icon: 'error',
                  });
            });
            return 
        }
    }
}
