import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'company-filter',
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})
export class CompanyFilterComponent implements OnInit {
  @Input() public types: string[] = [];
  @Input() public industries: string[] = [];
  @Output() protected filterEvent = new EventEmitter();

  protected filterForm = new FormGroup({
    textBox: new FormControl(''),
    selectBoxCompanyType: new FormControl('default'),
    selectBoxCompanyIndustry: new FormControl('default')
  });

  ngOnInit() {
    this.filterForm.valueChanges.subscribe(value => {
      const filters = {
        searchText: value.textBox,
        companyType: value.selectBoxCompanyType,
        companyIndustry: value.selectBoxCompanyIndustry
      };
      this.filterEvent.emit(filters);
    });
  }
}
