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
    return this.http.get<ICompany[]>('https://random-data-api.com/api/company/random_company?size=100').pipe(
      map(companies => {
        this.setAllCompanies(companies);
        return companies;
      })
    );
  }

  public setAllCompanies(companies: ICompany[]): void {
    this.companies = companies;
    this.sortedCompanies = [...companies];
  }

  public getCompanyById(id: number): ICompany | undefined {
    return this.companies!.find((company) => company.id == id);
  }

  public sortListCompanies(sortOption: string): ICompany[] | undefined {
    switch (sortOption) {
      case 'name':
        return this.sortedCompanies.sort((a, b) => a.business_name.localeCompare(b.business_name));
      case 'type':
        return this.sortedCompanies.sort((a, b) => a.type.localeCompare(b.type));
      case 'industry':
        return this.sortedCompanies.sort((a, b) => a.industry.localeCompare(b.industry));
      default:
        return this.sortedCompanies = [...this.companies!];
    }
  }
}
