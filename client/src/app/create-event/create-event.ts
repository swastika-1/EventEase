import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../services/event';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-event.html',
  styleUrl: './create-event.css'
})
export class CreateEvent {

  title = '';
  description = '';
  category = '';
  venue = '';
  date = '';
  time = '';
  capacity: number | null = null;
  image = '';

  loading = false;
  error = '';

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  createEvent(): void {

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

    this.loading = true;

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

    this.eventService.createEvent(eventData).subscribe({

      next: (response: any) => {

        console.log('EVENT CREATED:', response);

        alert('Event created successfully! 🎉');

        this.loading = false;

        this.router.navigate(['/organizer-dashboard']);
      },

      error: (error) => {

        console.error('CREATE EVENT ERROR:', error);

        this.error =
          error?.error?.message ||
          'Unable to create event.';

        this.loading = false;
      }

    });

  }

}