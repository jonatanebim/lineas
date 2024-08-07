import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CategoriesRequestsService {
  constructor(private httpClient: HttpClient) {}

  getCategoriesReport(params: any) {
    return this.httpClient
      .get(environment.categories, {
        params,
      })
      .pipe(map((data: any) => data.body))
  }
}
