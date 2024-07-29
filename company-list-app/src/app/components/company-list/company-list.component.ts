import { Component, OnInit } from '@angular/core';
import { ICompany } from "../../models/company.interface";
import { CompanyListService } from "../../service/company-list.service";
import { Observable, startWith, Subject, switchMap, tap } from "rxjs";
import { IFilterData } from "../../models/filter-data.interface";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent implements OnInit {
  protected allCompanies$: Observable<ICompany[]>;
  protected refreshSubject$: Subject<void> = new Subject<void>();
  protected filterList?: ICompany[] = [];
  protected sortList?: ICompany[] = [];
  protected list: ICompany[] = [];
  protected types: string[] = [];
  protected industries: string[] = [];

  constructor(private  _listService: CompanyListService) {
    this.allCompanies$ = this.refreshSubject$
      .pipe(
        startWith(null),
        switchMap(() => this.getAllCompany()),
        tap((companies: ICompany[]) => {
          this.filterList = companies;
          this.sortList = companies;
          this.getAllTypesCompanies();
          this.getAllIndustriesCompanies();
        })
      );
  }

  ngOnInit(): void {
    this.refreshSubject$.next();
  }

  protected getAllCompany(): Observable<ICompany[]> {
    return this._listService.getAllCompanies();
  }

  protected onSortChange(sortOption: string): void {
    this.sortList = this._listService.sortListCompanies(sortOption, this.filterList!);
  }

  protected getAllTypesCompanies(): void {
    this.types = this._listService.getAllTypesCompanies(this.filterList!);
  }

  protected getAllIndustriesCompanies(): void {
    this.industries = this._listService.getAllIndustriesCompanies(this.filterList!);
  }

  protected onFilterChange(filterData: IFilterData): void {
    this.filterList = this._listService.filterListCompanies(filterData);
    this.getAllTypesCompanies();
    this.getAllIndustriesCompanies();
  }
}
