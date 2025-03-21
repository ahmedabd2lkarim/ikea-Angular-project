import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, this.getHeaders());
  }



  updateOrderStatus(orderId: string, status: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/status/${orderId}`, status, this.getHeaders());
  }
}
