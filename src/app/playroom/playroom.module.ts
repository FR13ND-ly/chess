import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayroomComponent } from './playroom.component';
import { BoardComponent } from '../board/board.component';
import { FieldComponent } from '../field/field.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { InfoComponent } from '../info/info.component';
import { HeaderComponent } from '../header/header.component';



@NgModule({
  declarations: [
    PlayroomComponent,
    BoardComponent,
    FieldComponent,
    InfoComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: PlayroomComponent}
    ])
  ]
})
export class PlayroomModule { }
