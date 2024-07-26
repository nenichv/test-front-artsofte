import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICompany } from "../interfaces/company.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompanyListService {
  private companies: ICompany[] | undefined;
  private sortedCompanies: ICompany[] = [];

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
    this.sortedCompanies = [...companies];
  }

  public getCompanyById(id: number): ICompany | undefined {
    return this.companies!.find((company: ICompany) => company.id == id);
  }

  public sortListCompanies(sortOption: string): ICompany[] | undefined {
    switch (sortOption) {
      case 'name':
        return this.sortedCompanies.sort((current: ICompany, next: ICompany) => current.business_name.localeCompare(next.business_name));
      case 'type':
        return this.sortedCompanies.sort((current: ICompany, next: ICompany) => current.type.localeCompare(next.type));
      case 'industry':
        return this.sortedCompanies.sort((current: ICompany, next: ICompany) => current.industry.localeCompare(next.industry));
      default:
        return this.sortedCompanies = [...this.companies!];
    }
  }
}
