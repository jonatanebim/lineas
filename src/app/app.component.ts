import { Component, inject } from '@angular/core'
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router'
import { GlobalStoreService } from './shared/stores/global.store'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'informe'
  router = inject(Router)
  globalStore = inject(GlobalStoreService)

  constructor() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.globalStore.showLoading()
      }
    })
  }
}
