import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game, Games } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private api = 'https://public.connectnow.org.uk/applicant-test/';
  private _gameList: Game[] = [];
  allGames: Games;
  private refreshSubject$ = new BehaviorSubject<boolean>(true);
  constructor(private http: HttpClient) {}
  navItemClicked(test: boolean) {
    this.refreshSubject$.next(test);
  }
  getRefresh() {
    return this.refreshSubject$.asObservable();
  }
  fetchGames() {
    return this.http.get<Games>(this.api);
  }

  getGameList() {
    return this._gameList;
  }

  setGameList(data: Games) {
    this._gameList = data;
  }

  filterByName(name: string) {
    if (!name) {
      return;
    }
    const newGames: Games = [...this.allGames].filter((game: Game) =>
      game.name.toLowerCase().includes(name)
    );
    this.setGameList(newGames);

    console.log(this.getGameList());
  }

  filterByScore(score: number) {
    if (!score) {
      return;
    }
    this.setGameList(
      this.getGameList().filter((game: Game) => {
        return game.rating! >= score * 10;
      })
    );

    console.log(this.getGameList());
  }
  sortByProperty(property: string) {
    switch (property) {
      case 'name':
        this.setGameList(
          this.getGameList().sort((a: Game, b: Game) =>
            a.name.localeCompare(b.name)
          )
        );
        break;
      case 'date':
        this.setGameList(
          this.getGameList().sort(
            (a: Game, b: Game) => a.first_release_date - b.first_release_date
          )
        );
        break;
      case 'score':
        this.setGameList(
          this.getGameList().sort((a: Game, b: Game) => b.rating - a.rating)
        );
        break;

      default:
        return;
        break;
    }
  }
}
