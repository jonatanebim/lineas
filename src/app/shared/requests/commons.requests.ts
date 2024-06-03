import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommonsRequestsService {
  constructor(private httpClient: HttpClient) {}

  getMapVector() {
    return this.httpClient.get('https://code.highcharts.com/mapdata/countries/pe/pe-all.topo.json' ).pipe();
  }
}
