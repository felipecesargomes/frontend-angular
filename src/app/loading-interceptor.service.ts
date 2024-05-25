import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoadingService } from './shared/loading/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.startLoading();
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.loadingService.stopLoading();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.loadingService.stopLoading();
        return throwError(() => error);
      })
    );
  }
}
