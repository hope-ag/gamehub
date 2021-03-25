import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Game, Games } from 'src/app/models/interfaces';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit, OnDestroy {
  loading = true;
  games: Games;
  resultsFromSearch: boolean;
  constructor(public gameService: GamesService) {}
  //This is the method to fetch the gamelist
  initializeGameList() {
    return this.gameService.fetchGames().subscribe((games) => {
      this.gameService.allGames = games;
      this.gameService.setGameList(games);
      this.games = this.gameService.getGameList();
      this.loading = false;
    });
  }
  ngOnInit(): void {
    /*Since the same list is always returned, its good to store it in a service
     for the entire session so we dont continuously ping the
     server over and over for the same data*/
    if (!this.gameService.allGames) {
      this.initializeGameList();
    } else {
      // setTimeout(() => {
      this.games = this.gameService.getGameList();
      this.loading = false;
      // }, 2000);
    }
    this.gameService.getRefresh().subscribe((data) => {
      this.resultsFromSearch = data;
      this.updateUi();
      console.log(data);
    });
  }

  updateUi() {
    if (this.gameService.allGames) {
      this.games = this.gameService.getGameList();
    }
  }

  ngOnDestroy() {
    this.initializeGameList().unsubscribe();
  }
}
