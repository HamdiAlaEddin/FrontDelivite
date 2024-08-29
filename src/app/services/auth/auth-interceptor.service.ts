import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { UserserviceService } from '../userservice/userservice.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from 'src/app/components/login/login-form/login-form.component';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private dialog: MatDialog, private router: Router, private us : UserserviceService,private httpClient: HttpClient) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });


    return next.handle(req1).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.showLoginPopup();
          this.us.logout();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
    
  }
  private showLoginPopup(): void {
    this.dialog.open(LoginFormComponent, {
      width: '500px',
      height:'800px',
      disableClose: true,
      data: { message: 'Session expired. Please log in again.' }
    });
  }

  login() {
  }
  

  getCurrentUser(): Promise<any> {
    return this.httpClient.get<any>('/api/currentUser').toPromise();
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>('/api/logout', {});
  }
}