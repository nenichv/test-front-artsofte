import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CompanyListService } from "../../service/company-list.service";
import { ICompany } from "../../interfaces/company.interface";

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  protected company: ICompany | undefined;

  constructor(private route: ActivatedRoute, private listService: CompanyListService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.company = this.listService.getCompanyById(id);
  }
}
