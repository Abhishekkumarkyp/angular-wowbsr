import { Injectable } from '@angular/core';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  private totalRows: number = 11; // 10 rows of 7 + 1 row of 3
  private seatsPerRow: number[] = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
  private seats: Seat[] = [];

  constructor() {
    this.initializeSeats();
  }

  private initializeSeats() {
    let seatId = 1;
    for (let row of this.seatsPerRow) {
      for (let i = 0; i < row; i++) {
        this.seats.push({ id: seatId++, reserved: false });
      }
    }
  }

  getSeats(): Seat[] {
    return this.seats;
  }

  reserveSeats(seatIds: number[]): boolean {
    for (let id of seatIds) {
      const seat = this.seats.find((s) => s.id === id);
      if (seat && !seat.reserved) {
        seat.reserved = true;
      } else {
        return false; // If any seat can't be reserved, rollback.
      }
    }
    return true; // Successfully reserved all seats.
  }
}
