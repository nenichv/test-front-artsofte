import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'company-filter',
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})
export class CompanyFilterComponent {
  @Input() public types: string[] = [];
  @Input() public industries: string[] = [];
  @Output() protected filterEvent = new EventEmitter();

  protected filterForm = new FormGroup({
    textBox: new FormControl(''),
    selectBoxCompanyType: new FormControl(''),
    selectBoxCompanyIndustry: new FormControl('')
  });

  constructor() {
    const filterData = {
      searchText: this.filterForm.controls.textBox.value,
      companyType: this.filterForm.controls.selectBoxCompanyType.value,
      industryType: this.filterForm.controls.selectBoxCompanyIndustry.value
    };
    this.filterEvent.emit(filterData);
  }
}
