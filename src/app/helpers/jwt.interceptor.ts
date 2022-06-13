import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../components/auth/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.data?.access_token;
        const isApiUrl = request.url.startsWith(environment.endpoint);
        console.log('===============JwtInterceptor=============')
        console.log(currentUser)
        console.log(currentUser)
        if (isLoggedIn && isApiUrl) {
            console.log(currentUser)
            request = request.clone({
                setHeaders: {
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${currentUser.data.access_token}`
                }
            });
        }
        return next.handle(request);
    }
}