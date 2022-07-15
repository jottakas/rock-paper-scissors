import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { HandShapeComponent } from './components/game/hand-shape/hand-shape.component';
import { MetricsComponent } from './components/metrics/metrics.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HandShapeComponent,
    MetricsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
