import {Component, ViewChild} from '@angular/core';
import { ICompany } from "../../interfaces/company.interface";
import { CompanyListService } from "../../service/company-list.service";
import { Observable, startWith, Subject, switchMap, tap } from "rxjs";
import {CompanyFilterComponent} from "../company-filter/company-filter.component";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {
  protected allCompanies$: Observable<ICompany[]>;
  protected refreshSubject$: Subject<void> = new Subject<void>();
  protected sortList: ICompany[] | undefined = [];
  protected types: string[] = [];
  protected industries: string[] = [];
  @ViewChild(CompanyFilterComponent) filterComponent!: CompanyFilterComponent;

  constructor(protected  listService: CompanyListService) {
    this.allCompanies$ = this.refreshSubject$
      .pipe(
        startWith(null),
        switchMap(() => this.getAllCompany()),
        tap((companies: ICompany[]) => {
          this.sortList = this.listService.sortListCompanies('default');
          this.getAllTypesCompanies();
          this.getAllIndustriesCompanies();
        })
      );
  }

  ngOnInit(): void {
    this.refreshSubject$.next();
  }

  protected getAllCompany(): Observable<ICompany[]> {
    return this.listService.getAllCompanies();
  }

  protected onSortChange(sortOption: string): void {
    this.sortList = this.listService.sortListCompanies(sortOption);
  }

  protected getAllTypesCompanies(): void {
    this.types = this.listService.getAllTypesCompanies();
  }

  protected getAllIndustriesCompanies(): void {
    this.industries = this.listService.getAllIndustriesCompanies();
  }

  protected applyFilter(filterData: any): void {
    if (!this.sortList) return;

    let filteredCompanies: ICompany[] = this.sortList;

    if (filterData.searchText) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.business_name.toLowerCase().includes(filterData.searchText.toLowerCase())
      );
    }

    if (filterData.companyType) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.type === filterData.companyType
      );
    }

    if (filterData.industryType) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.industry === filterData.industryType
      );
    }

    this.sortList = filteredCompanies;
    console.log(this.sortList)
  }

}
