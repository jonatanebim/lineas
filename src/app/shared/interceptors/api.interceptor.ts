import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { FilterStoreService } from '../stores/filter.store'

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptorRequest implements HttpInterceptor {
  haveError!: boolean
  filterStore = inject(FilterStoreService)

  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any | HttpEvent<HttpHandler>> {
    const queryParams = this.filterStore.queryParms()

    const request = req.clone({
      setHeaders: {
        // Authorization: `Bearer ${authToken}`
      },
      params: new HttpParams()
        .set('lineCode', `${queryParams.lineCode || ''}`)
        .set('date', `${queryParams.date || ''}`)
        .set('untilToday', `${queryParams.untilToday}`),
    })

    return next.handle(request)
  }
}
