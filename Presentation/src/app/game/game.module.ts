import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { HandShapeComponent } from './components/game/hand-shape/hand-shape.component';
import { SharedModule } from '../shared/shared.module';
import { RoundOutcomeHandShapesComponent } from './components/game/round-outcome-hand-shapes/round-outcome-hand-shapes.component';
import { UserHandShapeInputComponent } from './components/game/user-hand-shape-input/user-hand-shape-input.component';
import { UserRoundsPerMatchInputComponent } from './components/game/user-rounds-per-match-input/user-rounds-per-match-input.component';
import { OutcomeComponent } from './components/game/outcome/outcome.component';

@NgModule({
  declarations: [
    GameComponent,
    HandShapeComponent,
    RoundOutcomeHandShapesComponent,
    UserHandShapeInputComponent,
    UserRoundsPerMatchInputComponent,
    OutcomeComponent,
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
