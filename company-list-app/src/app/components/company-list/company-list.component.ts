import { Component } from '@angular/core';
import { ICompany } from "../../interfaces/company.interface";
import { CompanyListService } from "../../service/company-list.service";
import { Observable, startWith, Subject, switchMap, tap } from "rxjs";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {
  protected allCompanies$: Observable<ICompany[]>;
  protected refreshSubject$: Subject<void> = new Subject<void>();
  protected sortList: ICompany[] | undefined = [];

  constructor(protected  listService: CompanyListService) {
    this.allCompanies$ = this.refreshSubject$
      .pipe(
        startWith(null),
        switchMap(() => this.getAllCompany()),
        tap(companies => this.sortList = this.listService.sortListCompanies('default'))
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

}
