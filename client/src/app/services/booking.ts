import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Booking {

  private apiUrl = 'https://eventease-production-046d.up.railway.app/api/bookings';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getMyBookings() {
    return this.http.get(
      `${this.apiUrl}/my?t=${Date.now()}`,
      this.getHeaders()
    );
  }

  bookEvent(eventId: string) {
    return this.http.post(
      this.apiUrl,
      { eventId: eventId },
      this.getHeaders()
    );
  }

  cancelBooking(bookingId: string) {
    return this.http.put(
      `${this.apiUrl}/${bookingId}/cancel`,
      {},
      this.getHeaders()
    );
  }

}