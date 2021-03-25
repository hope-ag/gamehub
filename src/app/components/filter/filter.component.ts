import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      score: new FormControl(),
      order: new FormControl(0),
    });
  }
}
