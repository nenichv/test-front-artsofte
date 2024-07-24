import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import { ICompany } from "../interfaces/company.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompanyListService {
  private companies: ICompany[] | undefined;

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
  }

  public getCompanyById(id: number): ICompany | undefined {
    if (this.companies) {
      return this.companies.find((company) => company.id == id);
    } else {
      console.log('1243')
      return undefined;
    }
  }
}
