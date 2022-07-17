import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { HandShapeComponent } from './components/game/hand-shape/hand-shape.component';
import { SharedModule } from '../shared/shared.module';
import { RoundOutcomeHandShapesComponent } from './components/game/round-outcome-hand-shapes/round-outcome-hand-shapes.component';
import { UserHandShapeInputComponent } from './components/game/user-hand-shape-input/user-hand-shape-input.component';

@NgModule({
  declarations: [
    GameComponent,
    HandShapeComponent,
    RoundOutcomeHandShapesComponent,
    UserHandShapeInputComponent,
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
