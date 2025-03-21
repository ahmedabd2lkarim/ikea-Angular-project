import { Injectable } from '@angular/core';
import { ICart } from '../Models/icart';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL: string = `${environment.baseURL}/api/cart`;
  constructor(private httpClient: HttpClient) { }

  getHeaders() {
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2NiZWI1ZWViZDYwMDkzYmI1MGE0ZiIsInJvbGUiOiJ2ZW5kb3IiLCJpYXQiOjE3NDI1NTU4MzIsImV4cCI6MTc0MjU3MzgzMn0.GPrXCPGZBxwDdPj7gOcB-eQ39HbSGUhgLYISgqC1ovg'; 
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
