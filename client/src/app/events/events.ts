import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event';
import { Booking } from '../services/booking';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events implements OnInit {

  events: any[] = [];
  loading = true;
  error = '';

  constructor(
    private eventService: EventService,
    private bookingService: Booking,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {

    console.log('Starting events request...');

    this.loading = true;
    this.error = '';

    this.eventService.getEvents().subscribe({

      next: (response: any) => {

        console.log('EVENTS RESPONSE:', response);

        const eventList = response.events || response || [];

        this.events = eventList.map((event: any) => {

          const formattedDate = event.date
            ? new Date(event.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })
            : 'Date not available';

          return {
            ...event,
            formattedDate: formattedDate,
            venue: event.venue || event.location || 'Venue not available',
            availableSeats: event.capacity - (event.seatsBooked || 0)
          };

        });

        console.log('Events loaded:', this.events);

        this.loading = false;

        console.log('Loading value:', this.loading);

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('EVENTS ERROR:', error);

        this.error = 'Unable to load events.';
        this.loading = false;

        this.cdr.detectChanges();
      }

    });

  }

  bookEvent(eventId: string): void {

    console.log('Booking event:', eventId);

    this.bookingService.bookEvent(eventId).subscribe({

      next: (response: any) => {

        console.log('BOOKING SUCCESS:', response);

        alert('Event booked successfully! 🎉');

        this.loadEvents();
      },

      error: (error) => {

        console.error('BOOKING ERROR:', error);

        alert(
          error?.error?.message ||
          'Unable to book this event.'
        );

        this.cdr.detectChanges();
      }

    });

  }

}