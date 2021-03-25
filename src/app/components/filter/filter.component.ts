import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  dropdownShown = false;

  constructor(private gameService: GamesService) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      score: new FormControl(),
      order: new FormControl(),
    });
  }

  clear() {
    //Reset the value of form fields
    this.filterForm.value.name &&
      this.filterForm.reset(this.filterForm.value.name);
    this.filterForm.value.score &&
      this.filterForm.reset(this.filterForm.value.score);
    this.filterForm.value.order &&
      this.filterForm.reset(this.filterForm.value.order);
    // Restore the list to normal
    this.gameService.setGameList(this.gameService.allGames);
    this.gameService.listUpdated(this.gameService.getGameList().length > 0);
  }
  toggleDropdown() {
    this.dropdownShown = !this.dropdownShown;
  }
  closeDropdown() {
    this.dropdownShown = false;
  }
  sortByvalue(input) {
    this.gameService.sortByProperty(input);
  }
  filterByName() {
    this.gameService.filterByName(this.filterForm.value.name);
    this.gameService.listUpdated(this.gameService.getGameList().length > 0);
  }
  filterByScore() {
    this.gameService.filterByScore(parseInt(this.filterForm.value.score));
    this.gameService.listUpdated(this.gameService.getGameList().length > 0);
  }
}
