import { Component, OnInit } from '@angular/core';
import { ICompany } from "../../models/company.interface";
import { CompanyListService } from "../../service/company-list.service";

@Component({
  selector: 'company-yandex-map',
  templateUrl: './company-yandex-map.component.html',
  styleUrl: './company-yandex-map.component.scss'
})
export class CompanyYandexMapComponent implements OnInit {
  protected companies?: ICompany[] = [];

  constructor(private _listService: CompanyListService) {

  }

  ngOnInit(): void {
  }
}
