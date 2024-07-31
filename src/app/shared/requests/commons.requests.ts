import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CommonsRequestsService {
  constructor(private httpClient: HttpClient) {}

  login(u: string, pwd: string) {
    return this.httpClient
      .post(`https://apiqa.quimicasuiza.com:8587/User/Login/v1`, {
        userName: u,
        password: pwd,
        organization: '',
      })
      .pipe()
  }

  getMapVector() {
    return this.httpClient.get('https://code.highcharts.com/mapdata/countries/pe/pe-all.topo.json').pipe()
  }

  downloadReport() {
    return this.httpClient.get(environment.report).pipe(map((data: any) => data.body))
  }
}
