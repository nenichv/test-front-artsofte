import { Component } from '@angular/core';
import { ICompany } from "../../interfaces/company.interface";
import {CompanyListService} from "../../service/company-list.service";
import {map, Observable, startWith, Subject, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {
  protected allCompanies$: Observable<ICompany[]>;
  protected refreshSubject$: Subject<void> = new Subject<void>();

  constructor(protected  listService: CompanyListService) {
    this.allCompanies$ = this.refreshSubject$
      .pipe(
        startWith(null),
        switchMap(() => this.getAllCompany()),
      );
  }

  ngOnInit(): void {

  }

  protected getAllCompany(): Observable<ICompany[]> {
    return this.listService.getAllCompanies();
  }

}
