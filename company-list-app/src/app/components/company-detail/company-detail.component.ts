import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CompanyListService } from "../../service/company-list.service";
import { ICompany } from "../../models/company.interface";

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  protected company?: ICompany;

  constructor(private _route: ActivatedRoute, private _listService: CompanyListService) {}

  ngOnInit(): void {
    const id = this._route.snapshot.params['id'];
    this.company = this._listService.getCompanyById(id);
  }
}
