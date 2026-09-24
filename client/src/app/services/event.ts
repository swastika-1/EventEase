import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:5000/api/events';

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get(this.apiUrl);
  }

  getOrganizerDashboard() {
    return this.http.get(`${this.apiUrl}/organizer/my-events`);
  }

  createEvent(eventData: any) {
    return this.http.post(this.apiUrl, eventData);
  }

  getEventById(eventId: string) {
    return this.http.get<any>(
      `${this.apiUrl}/${eventId}?t=${Date.now()}`
    );
  }

  updateEvent(eventId: string, eventData: any) {
    return this.http.put<any>(
      `${this.apiUrl}/${eventId}`,
      eventData
    );
  }

  deleteEvent(eventId: string) {
  return this.http.delete<any>(
    `${this.apiUrl}/${eventId}`
  );
}

getEventBookings(eventId: string) {
  return this.http.get<any>(
    `${this.apiUrl}/${eventId}/bookings`
  );
}
}