import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routes.module';
import { LayoutComponent } from "./components/layout/layout.component";
import { CompanyListComponent } from "./components/company-list/company-list.component";
import { CompanyDetailComponent } from "./components/company-detail/company-detail.component";
import { CompanyYandexMapComponent } from "./components/company-yandex-map/company-yandex-map.component";
import {CompanyItemComponent} from "./components/company-item/company-item.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        CompanyItemComponent
    ],
  providers: [],
  declarations: [
    AppComponent,
    LayoutComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    CompanyYandexMapComponent,
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
