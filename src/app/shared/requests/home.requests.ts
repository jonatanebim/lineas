import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { environment } from '../../../environments/environment.development'
import { map, tap } from 'rxjs'
import { LocalStorageService } from 'ngx-webstorage'

@Injectable({
  providedIn: 'root',
})
export class HomeRequestsService {
  localSt = inject(LocalStorageService)

  constructor(private httpClient: HttpClient) {}

  getHomeReport() {
    return this.httpClient.get(environment.home).pipe(
      map((data: any) => data.body),
      tap((data) => console.log(data))
    )
  }
}
