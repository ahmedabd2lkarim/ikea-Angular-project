import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Icategory } from '../Models/icategory';
import { Iproduct } from '../Models/iproduct';
@Injectable({ providedIn: 'root' })
export class ProductsWithApiService {
  baseURL: string = `${environment.baseURL}/api`;
  token: string =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2NiZWI1ZWViZDYwMDkzYmI1MGE0ZiIsInJvbGUiOiJ2ZW5kb3IiLCJpYXQiOjE3NDI1NTU4MzIsImV4cCI6MTc0MjU3MzgzMn0.GPrXCPGZBxwDdPj7gOcB-eQ39HbSGUhgLYISgqC1ovg';
  headers = new HttpHeaders({
    Authorization: this.token,
  });
  // baseURL: string = `${environment.baseURL}`;

  constructor(private httpclient: HttpClient) {}

  getAllProducts(): Observable<Iproduct[]> {
    const headers = new HttpHeaders({
      Authorization: this.token,
    });
    return this.httpclient.get<Iproduct[]>(
      `${this.baseURL}/products/vendorPros`,
      {
        headers,
      }
    );
    // return this.httpclient.get<Iproduct[]>(`${this.baseURL}/products`);
  }
  getProductById(id: string): Observable<Iproduct> {
    const headers = new HttpHeaders({
      Authorization: this.token,
    });
    return this.httpclient.get<Iproduct>(
      `${this.baseURL}/products/vendorPros/${id}`,
      { headers }
    );
    // return this.httpclient.get<Iproduct>(`${this.baseURL}/products/${id}`);
  }
  getAllCategories(): Observable<Icategory[]> {
    const headers = new HttpHeaders({
      Authorization: this.token,
    });
    return this.httpclient.get<Icategory[]>(`${this.baseURL}/categories`, {
      headers,
    });
  }
}
