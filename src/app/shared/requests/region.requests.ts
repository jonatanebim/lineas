import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class RegionRequestsService {
  constructor(private httpClient: HttpClient) {}

  getRegionReport(department: string) {
    console.log('=> ', department)
    return this.httpClient.get(environment.region).pipe()
  }
}
