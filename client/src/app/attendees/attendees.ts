import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../services/event';

@Component({
  selector: 'app-attendees',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './attendees.html',
  styleUrl: './attendees.css'
})
export class Attendees implements OnInit {

  eventId = '';

  event: any = null;
  attendees: any[] = [];

  loading = true;
  error = '';

 constructor(
  private route: ActivatedRoute,
  private eventService: EventService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    this.eventId =
      this.route.snapshot.paramMap.get('id') || '';

    if (!this.eventId) {
      this.error = 'Event ID is missing.';
      this.loading = false;
      return;
    }

    this.loadAttendees();
  }

  loadAttendees(): void {

  console.log(
    'Loading attendees for event:',
    this.eventId
  );

  this.eventService
    .getEventBookings(this.eventId)
    .subscribe({

      next: (response: any) => {

        console.log(
          'ATTENDEES RESPONSE:',
          response
        );

        this.event = response.event || null;
        this.attendees = response.attendees || [];

        this.loading = false;

        console.log(
          'Attendees loaded:',
          this.attendees
        );

        console.log(
          'Loading:',
          this.loading
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'ATTENDEES ERROR:',
          error
        );

        this.error =
          error?.error?.message ||
          'Unable to load attendees.';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
}

}