import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { SeatReservationComponent } from './components/seat-reservation/seat-reservation.component';
import { SeatService } from './services/seat.service';

@NgModule({
  imports: [BrowserModule, FormsModule, BrowserModule],
  declarations: [AppComponent, HelloComponent, SeatReservationComponent],
  providers: [SeatService],

  bootstrap: [AppComponent],
})
export class AppModule {}
