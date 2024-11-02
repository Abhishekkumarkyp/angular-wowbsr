import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css'],
})
export class SeatReservationComponent implements OnInit {
  seats: any[][] = []; // Updated to a 2D array for rows
  reservedSeats: number[] = [];
  numSeats: number = 1;
  errorMessage: string = '';

  ngOnInit() {
    // Initialize seats in rows
    const totalSeats = 80;
    for (let i = 0; i < totalSeats; i += 7) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if (i + j < totalSeats) {
          row.push({ number: i + j + 1, available: true });
        }
      }
      this.seats.push(row);
    }
  }

  reserveSeats() {
    if (this.numSeats < 1 || this.numSeats > 7) {
      this.errorMessage = 'You can reserve between 1 and 7 seats at a time.';
      return;
    }

    let seatsToReserve = this.numSeats;
    let reserved: number[] = [];
    this.errorMessage = '';

    // Try to find a row with enough available seats
    for (let row of this.seats) {
      let availableSeats = row.filter((seat) => seat.available);

      if (availableSeats.length >= seatsToReserve) {
        // Reserve seats in the same row
        for (let j = 0; j < seatsToReserve; j++) {
          availableSeats[j].available = false;
          reserved.push(availableSeats[j].number);
        }
        this.reservedSeats = this.reservedSeats.concat(reserved);
        return;
      }
    }

    // If no single row has enough seats, reserve nearby seats
    for (let row of this.seats) {
      for (let seat of row) {
        if (seat.available) {
          seat.available = false;
          reserved.push(seat.number);
          seatsToReserve--;
          if (seatsToReserve === 0) {
            this.reservedSeats = this.reservedSeats.concat(reserved);
            return;
          }
        }
      }
    }

    this.errorMessage = 'Not enough adjacent seats available for reservation.';
  }
}
