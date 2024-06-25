import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpParams,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { FilterStoreService } from '../stores/filter.store'
import { environment } from '../../../environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptorRequest implements HttpInterceptor {
  haveError!: boolean
  filterStore = inject(FilterStoreService)

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any | HttpEvent<HttpHandler>> {
    const queryParams = this.filterStore.queryParms()
    console.log(queryParams);
    const request = req.clone({
      headers: req.url.includes('/User')
        ? req.headers
            .set('Content-Type', 'application/json')
            .set(environment.config.interceptor.header, environment.config.interceptor.token)
        : req.headers,
      params: req.url.includes('/User')
        ? new HttpParams()
        : req.params
            .set('lineCode', `${queryParams.lineCode || ''}`)
            .set('date', `${queryParams.date || ''}`)
            .set('untilToday', `${queryParams.untilToday}`),
    })

    return next.handle(request).pipe(
      tap(
        (_e) => {
          if (_e instanceof HttpResponse) {
            this.haveError = false
          }
        },
        (_e: any) => {
          if (_e instanceof HttpErrorResponse) {
            if (_e.status === 400) {
              this.haveError = true
              console.error(_e.error.Message)
            }
            if (_e.status === 401) {
              this.haveError = true
              //this.storageService.closeSesion();
            }
          }
        }
      )
    )
  }
}
