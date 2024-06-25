import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeRequestsService {
  constructor(private httpClient: HttpClient) {}

  getHomeReport() {
    return this.httpClient.get(environment.home).pipe(map((data: any) => data.body));
  }
}
