import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { map, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RegionRequestsService {
  constructor(private httpClient: HttpClient) {}

  getRegionReport(region: string) {
    return this.httpClient
      .get(environment.region, {
        params: {
          region: region.toUpperCase(),
        },
      })
      .pipe(map((data: any) => data.body))
  }
}
