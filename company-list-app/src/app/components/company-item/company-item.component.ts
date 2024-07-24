import {Component, Input} from '@angular/core';
import {ICompany} from "../../interfaces/company.interface";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'company-item',
  templateUrl: './company-item.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  styleUrl: './company-item.component.scss'
})
export class CompanyItemComponent {
  @Input()
  company?: ICompany;
}
