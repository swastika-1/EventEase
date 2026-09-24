import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Booking {

  private apiUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) {}

  getMyBookings() {
    return this.http.get(`${this.apiUrl}/my?t=${Date.now()}`);
  }

  bookEvent(eventId: string) {
    return this.http.post(`${this.apiUrl}`, {
      eventId: eventId
    });
  }

  cancelBooking(bookingId: string) {
    return this.http.put(`${this.apiUrl}/${bookingId}/cancel`, {});
  }

}