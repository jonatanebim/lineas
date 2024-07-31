import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CompetenciesRequestsService {
  constructor(private httpClient: HttpClient) {}

  getCompetenciesReport(params: any) {
    return this.httpClient
      .get(environment.competencies, {
        params,
      })
      .pipe(map((data: any) => data.body))
  }
}
