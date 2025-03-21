import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Icategory } from '../model/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/api/categories';
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
      token!
    });
  }

  getCategories(): Observable<Icategory[]> {
    return this.http.get<Icategory[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  getCategoryById(id: string): Observable<Icategory> {
    return this.http.get<Icategory>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }


  createCategory(category: Icategory): Observable<Icategory> {
    return this.http.post<Icategory>(this.apiUrl, category, {
      headers: this.getHeaders(),
    });
  }

  updateCategory(id: string, category: Icategory): Observable<Icategory> {
    return this.http.patch<Icategory>(`${this.apiUrl}/${id}`, category, {
      headers: this.getHeaders(),
    });
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
