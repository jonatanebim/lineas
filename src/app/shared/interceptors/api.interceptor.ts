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
import { Observable, of, tap } from 'rxjs'
import { FilterStoreService } from '../stores/filter.store'
import { environment } from '../../../environments/environment.development'
import { LocalStorageService } from 'ngx-webstorage'
import { GlobalStoreService } from '../stores/global.store'

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptorRequest implements HttpInterceptor {
  haveError!: boolean
  filterStore = inject(FilterStoreService)
  localSt = inject(LocalStorageService)
  globalStore = inject(GlobalStoreService)

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any | HttpEvent<HttpHandler>> {
    const queryParams = this.filterStore.queryParms()
    const isUserQuery = req.url.includes('/User')
    const request = req.clone({
      headers: isUserQuery
        ? req.headers
            .set('Content-Type', 'application/json')
            .set(environment.config.interceptor.header, environment.config.interceptor.token)
        : req.headers,
      params: isUserQuery
        ? new HttpParams()
        : req.params
            .set('lineCode', `${queryParams.lineCode || ''}`)
            .set('date', `${queryParams.date || ''}`)
            .set('untilToday', `${queryParams.untilToday}`),
    })
    const urlWithParams = request.urlWithParams
    const exists = this.localSt.retrieve(urlWithParams)

    if (exists) {
      return of(new HttpResponse(exists)).pipe()
    } else {
      return next.handle(request).pipe(
        tap(
          (_e) => {
            if (_e instanceof HttpResponse) {
              this.haveError = false
              if (!isUserQuery) {
                this.localSt.store(urlWithParams, _e)
              }
            }
          },
          (_e: any) => {
            if (_e instanceof HttpErrorResponse) {
              this.globalStore.hideLoading()
              if (_e.status === 400) {
                this.haveError = true
              }
              if (_e.status === 401) {
                this.haveError = true
              }
            }
          }
        )
      )
    }
  }
}
