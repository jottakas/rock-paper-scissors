import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { HandShapeComponent } from './components/game/hand-shape/hand-shape.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GameComponent,
    HandShapeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    GameComponent,
    HandShapeComponent
  ]
})
export class GameModule { }
