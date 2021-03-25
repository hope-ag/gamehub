import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private gameService: GamesService) {}
  //This is the function to fetch the gamelist
  initializeGameList() {
    return this.gameService.fetchGames().subscribe((games) => {
      this.gameService.setGameList(games);
      this.games = games;
      localStorage.setItem('games', JSON.stringify(games));
    });
  }
  ngOnInit(): void {
    /*Since the same list is always returned, its good to store it in local storage
     so we dont continuously ping the server over and over for the same data*/
    if (!localStorage.getItem('games')) {
      this.initializeGameList();
      this.loading = false;
    } else {
      setTimeout(() => {
        this.games = JSON.parse(localStorage.getItem('games'));
        this.loading = false;
      }, 2000);
    }
  }
  ngOnDestroy() {
    this.initializeGameList().unsubscribe();
  }
}
