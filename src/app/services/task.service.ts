import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../types/task.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private baseUrl = 'https://localhost:7292/api/Assignment';

  constructor(private http: HttpClient) {}

  getTasksByStatus(status: number): Observable<Task[]> {
    const params = new HttpParams().set('status', status.toString());
    return this.http
      .get<Task[]>(this.baseUrl, { params })
      .pipe(catchError(this.handleError));
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.http
      .post<Task>(this.baseUrl, task)
      .pipe(catchError(this.handleError));
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http
      .put<Task>(`${this.baseUrl}/${id}`, task)
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
