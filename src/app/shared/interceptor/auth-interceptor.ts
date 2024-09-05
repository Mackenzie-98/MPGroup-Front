import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = localStorage.getItem('user');
        const username = user ? JSON.parse(user).username : null;

        if (username) {
            const clonedRequest = req.clone({
                setHeaders: {
                    'X-Username': username
                }
            });

            return next.handle(clonedRequest);
        }

        return next.handle(req);
    }
}
