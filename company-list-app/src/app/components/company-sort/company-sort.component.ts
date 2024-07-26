import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'company-sort',
  templateUrl: './company-sort.component.html',
  styleUrl: './company-sort.component.scss'
})
export class CompanySortComponent {
  @Output() sortChange: EventEmitter<string> = new EventEmitter<string>();
  protected selectedOption: string = 'default';

  onSortChange(): void {
    this.sortChange.emit(this.selectedOption);
  }
}
