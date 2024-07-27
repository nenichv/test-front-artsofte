import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { IFilterData } from "../../models/filter-data.interface";

@Component({
  selector: 'company-filter',
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})
export class CompanyFilterComponent implements OnInit {
  @Input()
  public types: string[] = [];
  @Input()
  public industries: string[] = [];
  @Output()
  protected filterEvent: EventEmitter<IFilterData> = new EventEmitter<IFilterData>();

  protected filterForm: FormGroup = new FormGroup({
    textBox: new FormControl(''),
    selectBoxCompanyType: new FormControl('default'),
    selectBoxCompanyIndustry: new FormControl('default')
  });

  ngOnInit() {
    this.filterForm.valueChanges.subscribe(value => {
      const filters: IFilterData = {
        searchText: value.textBox,
        companyType: value.selectBoxCompanyType,
        companyIndustry: value.selectBoxCompanyIndustry
      };
      this.filterEvent.emit(filters);
    });
  }
}
