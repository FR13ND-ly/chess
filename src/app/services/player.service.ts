import { Injectable, inject } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private utils = inject(UtilsService)
  
  getUsername() {
    return localStorage.getItem('username') || 'John Doe';
  }

  getColor(game: any) {
    let color = 'watching'
    if (game.player1.id == this.getId()) color = 'w'
    if (game.player2.id == this.getId()) color = 'b'
    return color
  }

  setUsername(username: string) {
    localStorage.setItem('username', username);
  }

  getId() : string {
    if (localStorage.getItem('playerId') === null) {
      localStorage.setItem('playerId', this.utils.generateId());
    }
    return <string>localStorage.getItem('playerId');
  }
}
