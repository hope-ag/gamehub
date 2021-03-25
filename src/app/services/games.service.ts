import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, Games } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private api = 'https://public.connectnow.org.uk/applicant-test/';
  private _gameList: Game[] = [];
  constructor(private http: HttpClient) {}

  fetchGames() {
    return this.http.get<Games>(this.api);
  }

  getGameList() {
    return this._gameList;
  }

  setGameList(data: Games) {
    this._gameList = data;
  }
}
