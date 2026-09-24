import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './organizer-dashboard.html',
  styleUrl: './organizer-dashboard.css'
})
export class OrganizerDashboard implements OnInit {

  events: any[] = [];

  totalEvents = 0;
  totalBookings = 0;
  availableSeats = 0;

  loading = true;
  error = '';

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.loading = true;
    this.error = '';

    this.eventService.getOrganizerDashboard().subscribe({

      next: (response: any) => {

        console.log('ORGANIZER DASHBOARD:', response);

        this.events = response.events || [];

        this.totalEvents = response.stats?.totalEvents || 0;
        this.totalBookings = response.stats?.totalBookings || 0;
        this.availableSeats = response.stats?.availableSeats || 0;

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('ORGANIZER DASHBOARD ERROR:', error);

        this.error =
          error?.error?.message ||
          'Unable to load organizer dashboard.';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });

  }

  deleteEvent(eventId: string): void {

    const confirmed = confirm(
      'Are you sure you want to delete this event?'
    );

    if (!confirmed) {
      return;
    }

    console.log('Deleting event:', eventId);

    this.eventService.deleteEvent(eventId).subscribe({

      next: (response: any) => {

        console.log('EVENT DELETED:', response);

        alert('Event deleted successfully!');

        this.loadDashboard();
      },

      error: (error) => {

        console.error('DELETE EVENT ERROR:', error);

        alert(
          error?.error?.message ||
          'Unable to delete event.'
        );
      }

    });

  }

}