import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  
  @Input() game: any

  invitationLink: string = ''

  ngOnInit(): void {
    this.invitationLink = `${window.location.origin}/join/${this.game.id}` 
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.invitationLink)
  }
}
