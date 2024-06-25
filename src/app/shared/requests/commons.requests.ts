import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CommonsRequestsService {
  constructor(private httpClient: HttpClient) {}

  login(u: string, pwd: string) {
    return this.httpClient
      .get(`https://apiqa.quimicasuiza.com:8587/User/GetUserInfo/v1?ruc=${u}&password=${pwd}`)
      .pipe()
  }

  getMapVector() {
    return this.httpClient.get('https://code.highcharts.com/mapdata/countries/pe/pe-all.topo.json').pipe()
  }
}
