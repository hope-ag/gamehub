import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  dropdownShown = false;

  constructor() {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      score: new FormControl(),
      order: new FormControl(),
    });
  }

  clear() {
    this.filterForm.value.name &&
      this.filterForm.reset(this.filterForm.value.name);
    this.filterForm.value.score &&
      this.filterForm.reset(this.filterForm.value.score);
    this.filterForm.value.order &&
      this.filterForm.reset(this.filterForm.value.order);
    console.log(this.filterForm.value.order);
  }
  toggleDropdown() {
    this.dropdownShown = !this.dropdownShown;
  }
}
