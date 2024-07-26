import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICompany } from "../interfaces/company.interface";
import { HttpClient } from "@angular/common/http";
import { IFilterData } from "../interfaces/filter-data.interface";

@Injectable({
  providedIn: 'root'
})
export class CompanyListService {
  private companies?: ICompany[];

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
  }

  public getCompanyById(id: number): ICompany | undefined {
    return this.companies!.find((company: ICompany) => company.id == id);
  }

  public sortListCompanies(sortOption: string, list: ICompany[]): ICompany[] | undefined {
    switch (sortOption) {
      case 'name':
        return list.sort((current: ICompany, next: ICompany) => current.business_name.localeCompare(next.business_name));
      case 'type':
        return list.sort((current: ICompany, next: ICompany) => current.type.localeCompare(next.type));
      case 'industry':
        return list.sort((current: ICompany, next: ICompany) => current.industry.localeCompare(next.industry));
      default:
        return list;
    }
  }
  public filterListCompanies(filterData: IFilterData) {
    return this.companies!.filter((company: ICompany) => {
      let checked: boolean = true;

      if (filterData.companyType && filterData.companyType !== 'default') {
        checked = company.type === filterData.companyType
      }
      if (filterData.companyIndustry && filterData.companyIndustry !== 'default') {
        checked = checked && company.industry === filterData.companyIndustry
      }
      if (filterData.searchText) {
        checked = checked &&  company.business_name.toLowerCase().includes(filterData.searchText!.toLowerCase())
      }
      return checked;
    }
    )
  }
}
