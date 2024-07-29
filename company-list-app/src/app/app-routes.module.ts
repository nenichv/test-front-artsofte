import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from "./components/company-list/company-list.component";
import { CompanyDetailComponent } from "./components/company-detail/company-detail.component";
import { CompanyYandexMapComponent } from "./components/company-yandex-map/company-yandex-map.component";
import { ErrorNotFoundComponent } from "./components/error-not-found/error-not-found.component";

const routes: Routes = [
  {
    path: 'list',
    component: CompanyListComponent
  },
  {
    path: 'detail/:id',
    component: CompanyDetailComponent
  },
  {
    path: 'map',
    component:  CompanyYandexMapComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: '**',
    component:  ErrorNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
