import { Injectable } from '@angular/core';
import { ICart } from '../Models/icart';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL: string = `${environment.baseURL}/api/orders`;
  constructor(private httpClient: HttpClient) { }

  getHeaders() {
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjRmNTI1YTc1OWQ2N2E0Y2JkNDYzNSIsInJvbGUiOiJ2ZW5kb3IiLCJpYXQiOjE3NDgyOTgyOTAsImV4cCI6MTc0ODMxNjI5MH0.RRKF5PzACBOAphd9SU-TzihkmQVzm53hAc7rkM-YfDo'; 
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getVendorOrders(): Observable<ICart[]> {    
    return this.httpClient.get<ICart[]>(`${this.baseURL}/vendor`,this.getHeaders());
  }
}
