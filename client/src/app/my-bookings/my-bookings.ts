import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Booking } from '../services/booking';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css'
})
export class MyBookings implements OnInit {

  bookings: any[] = [];
  loading = true;
  error = '';

  constructor(
    private bookingService: Booking,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {

    console.log('Starting bookings request...');

    this.loading = true;
    this.error = '';

    this.bookingService.getMyBookings().subscribe({

      next: (response: any) => {

        console.log('BOOKINGS RESPONSE:', response);

        this.bookings = response.bookings || [];

        this.loading = false;

        console.log('Loading value:', this.loading);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('BOOKINGS ERROR:', error);

        this.error = 'Unable to load your bookings.';
        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }

  cancelBooking(bookingId: string): void {

    const confirmed = confirm(
      'Are you sure you want to cancel this booking?'
    );

    if (!confirmed) {
      return;
    }

    console.log('Cancelling booking:', bookingId);

    this.bookingService.cancelBooking(bookingId).subscribe({

      next: (response: any) => {

        console.log('CANCEL SUCCESS:', response);

        alert('Booking cancelled successfully!');

        this.loadBookings();

      },

      error: (error) => {

        console.error('CANCEL ERROR:', error);

        alert(
          error?.error?.message ||
          'Unable to cancel booking.'
        );

      }

    });
  }

}