import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../services/event';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-event.html',
  styleUrl: './edit-event.css'
})
export class EditEvent implements OnInit {

  eventId = '';

  title = '';
  description = '';
  category = '';
  venue = '';
  date = '';
  time = '';
  capacity: number | null = null;
  image = '';

  loading = true;
  saving = false;
  error = '';

  constructor(
  private route: ActivatedRoute,
  private eventService: EventService,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    this.eventId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.eventId) {
      this.error = 'Event ID is missing.';
      this.loading = false;
      return;
    }

    this.loadEvent();
  }

  loadEvent(): void {

  console.log('EDIT EVENT: Starting request...');
  console.log('EDIT EVENT ID:', this.eventId);

  this.eventService.getEventById(this.eventId).subscribe({
    next: (response: any) => {

      console.log('EDIT EVENT RESPONSE:', response);

      const event = response.event;

      if (!event) {
        this.error = 'Event data not found.';
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      this.title = event.title || '';
      this.description = event.description || '';
      this.category = event.category || '';
      this.venue = event.venue || '';

      this.date = event.date
        ? new Date(event.date).toISOString().split('T')[0]
        : '';

      this.time = event.time || '';
      this.capacity = event.capacity || null;
      this.image = event.image || '';

      this.loading = false;

      console.log('EDIT EVENT: Data loaded');
      console.log('Loading:', this.loading);

      this.cdr.detectChanges();
    },

    error: (error) => {

      console.error('LOAD EVENT ERROR:', error);

      this.error =
        error?.error?.message ||
        'Unable to load event.';

      this.loading = false;

      this.cdr.detectChanges();
    }
  });
}

  updateEvent(): void {

    this.error = '';

    if (
      !this.title ||
      !this.description ||
      !this.category ||
      !this.venue ||
      !this.date ||
      !this.time ||
      !this.capacity
    ) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    if (this.capacity <= 0) {
      this.error = 'Capacity must be greater than 0.';
      return;
    }

    this.saving = true;

    const eventData = {
      title: this.title,
      description: this.description,
      category: this.category,
      venue: this.venue,
      date: this.date,
      time: this.time,
      capacity: this.capacity,
      image: this.image
    };

    this.eventService
      .updateEvent(this.eventId, eventData)
      .subscribe({

        next: (response: any) => {

          console.log('EVENT UPDATED:', response);

          alert('Event updated successfully! 🎉');

          this.saving = false;

          this.router.navigate(['/organizer-dashboard']);
        },

        error: (error) => {

          console.error('UPDATE EVENT ERROR:', error);

          this.error =
            error?.error?.message ||
            'Unable to update event.';

          this.saving = false;
        }

      });

  }

}