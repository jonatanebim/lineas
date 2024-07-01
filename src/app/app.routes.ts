import { InMemoryScrollingFeature, InMemoryScrollingOptions, Routes, withInMemoryScrolling } from '@angular/router'

import Paths from './shared/constants/paths'
import { LoginComponent } from './pages/views/Login/Login.component'
import { ContentComponent } from './shared/components/layout'
import { HomeComponent } from './pages/views/Home/Home.component'
import { RegionComponent } from './pages/views/Region/Region.component'
import { CategoriesComponent } from './pages/views/Categories/Categories.component'
import { canActiveGuard } from './shared/guards/can-active.guard'

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
}

export const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig)
export const routes: Routes = [
  {
    path: Paths.base,
    component: LoginComponent,
  },
  {
    path: Paths.dashboard.path,
    component: ContentComponent,
    canActivate: [canActiveGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `${Paths.dashboard.childrens.home}`,
      },
      {
        path: Paths.dashboard.childrens.home,
        component: HomeComponent,
      },
      {
        path: Paths.dashboard.childrens.categories,
        component: CategoriesComponent,
      },
      {
        path: Paths.dashboard.childrens.regions,
        component: RegionComponent,
      },
    ],
  },
]
