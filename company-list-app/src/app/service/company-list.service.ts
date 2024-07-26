import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICompany } from "../interfaces/company.interface";
import { HttpClient } from "@angular/common/http";
import {IFilterData} from "../interfaces/filter-data.interface";

@Injectable({
  providedIn: 'root'
})
export class CompanyListService {
  private companies: ICompany[] | undefined;
  private filterSortList: ICompany[] = [];

  constructor(private http: HttpClient) {}

  public getAllCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>('https://random-data-api.com/api/company/random_company?size=3').pipe(
      map((companies: ICompany[]) => {
        this.setAllCompanies(companies);
        return companies;
      })
    );
  }

  public getAllTypesCompanies(): string[] {
    return this.companies ? [...new Set(this.companies.map((company: ICompany) => company.type))] : [];
  }

  public getAllIndustriesCompanies(): string[] {
    return this.companies ? [...new Set(this.companies.map((company: ICompany) => company.industry))] : [];
  }

  public setAllCompanies(companies: ICompany[]): void {
    this.companies = companies;
    this.filterSortList = [...companies];
  }

  public getCompanyById(id: number): ICompany | undefined {
    return this.companies!.find((company: ICompany) => company.id == id);
  }

  public sortListCompanies(sortOption: string): ICompany[] | undefined {
    let sortList = [...this.filterSortList];

    switch (sortOption) {
      case 'name':
        sortList = this.filterSortList.sort((current: ICompany, next: ICompany) => current.business_name.localeCompare(next.business_name));
        break;
      case 'type':
        sortList = this.filterSortList.sort((current: ICompany, next: ICompany) => current.type.localeCompare(next.type));
        break;
      case 'industry':
        sortList = this.filterSortList.sort((current: ICompany, next: ICompany) => current.industry.localeCompare(next.industry));
        break;
    }
    this.filterSortList = sortList;
    return this.filterSortList;
  }

  public filterListCompaniesBySearch(filterData: IFilterData): ICompany[] {
    if (!filterData.searchText || filterData.searchText === '') {
      return this.filterSortList;
    }
    return this.filterSortList.filter((company) => company.business_name.toLowerCase().includes(filterData.searchText!.toLowerCase()))
  }

  public filterListCompaniesByType(filterData: IFilterData): ICompany[] {
    if (!filterData.companyType || filterData.companyType === 'default') {
      return this.filterSortList;
    }
    return this.filterSortList.filter(company => company.type === filterData.companyType);
  }

  public filterListCompaniesByIndustry(filterData: IFilterData): ICompany[] {
    if (!filterData.companyIndustry || filterData.companyIndustry === 'default') {
      return this.filterSortList;
    }
    return this.filterSortList.filter(company => company.industry === filterData.companyIndustry);
  }
}
