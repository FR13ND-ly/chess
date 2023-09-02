import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, startWith } from 'rxjs'
import { GameService } from '../services/game.service';
import { Location } from '@angular/common';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-playroom',
  templateUrl: './playroom.component.html',
  styleUrls: ['./playroom.component.scss']
})
export class PlayroomComponent {

  router = inject(Router)
  route = inject(ActivatedRoute)
  gameService = inject(GameService)
  location = inject(Location)
  playerService = inject(PlayerService)

  game$: Observable<any> = this.route.params.pipe(
    switchMap((params: any) => {
      if (this.route.snapshot.data['join']) this.join(params.id)
      return this.gameService.getGame(params.id)
    })
  )

  isDisabled(game: any) {
    return game.state != '' || !game.player2.id
  }

  join(gameId: string) {
    // this.gameService.exists(gameId).subscribe((exists : boolean): Promise<boolean> | void => {
      // if (!exists) {
      //   alert('Game not found')
      //   return this.router.navigate(['/'])
      // }
      let user =  {
        name: this.playerService.getUsername(),
        id: this.playerService.getId(),
      }
      this.gameService.joinGame(gameId, user)
      this.location.replaceState(`/play/${gameId}`)
    // })
  }
}
