import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routes.module';
import { LayoutComponent } from "./components/layout/layout.component";
import { CompanyListComponent } from "./components/company-list/company-list.component";
import { CompanyDetailComponent } from "./components/company-detail/company-detail.component";
import { CompanyYandexMapComponent } from "./components/company-yandex-map/company-yandex-map.component";
import { CompanyItemComponent } from "./components/company-item/company-item.component";
import { HttpClientModule } from "@angular/common/http";
import { CompanySortComponent } from "./components/company-sort/company-sort.component";
import { CompanyFilterComponent } from "./components/company-filter/company-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ErrorNotFoundComponent } from "./components/error-not-found/error-not-found.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { AngularYandexMapsModule } from "angular8-yandex-maps";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CompanyItemComponent,
    FormsModule,
    ReactiveFormsModule,
    ErrorNotFoundComponent,
    LoaderComponent,
    AngularYandexMapsModule
  ],
  providers: [],
  declarations: [
    AppComponent,
    LayoutComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyYandexMapComponent,
    CompanySortComponent,
    CompanyFilterComponent
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
