import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../types/task.model';
@Injectable({ providedIn: 'root' })
export class TaskService {
  baseUrl = 'https://localhost:7292';

  constructor(private http: HttpClient) {}

  getTaskByStatus(status: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/api/Assignment/${status}`);
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/api/Assignment`, task);
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/api/Assignment/${id}`, task);
  }
}
