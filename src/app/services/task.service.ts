import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, combineLatest } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from '../types/task.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private baseUrl = 'https://localhost:7292/api/Assignment';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  private currentTasksSubject = new BehaviorSubject<Task[]>([]);
  currentTasks$: Observable<Task[]> = this.currentTasksSubject.asObservable();

  private completedTasksSubject = new BehaviorSubject<Task[]>([]);
  completedTasks$: Observable<Task[]> =
    this.completedTasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  loadTasks(): void {
    const status1$ = this.getTasksByStatus(1);
    const status2$ = this.getTasksByStatus(2);

    combineLatest([status1$, status2$]).subscribe(
      ([tasks1, tasks2]) => {
        this.currentTasksSubject.next(tasks1);
        this.completedTasksSubject.next(tasks2);
        this.tasksSubject.next([...tasks1, ...tasks2]);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  getTasksByStatus(status: number): Observable<Task[]> {
    const params = new HttpParams().set('status', status.toString());
    return this.http
      .get<Task[]>(this.baseUrl, { params })
      .pipe(catchError(this.handleError));
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task).pipe(
      tap(() => this.loadTasks()),
      catchError(this.handleError)
    );
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task).pipe(
      tap(() => this.loadTasks()),
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.loadTasks()),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
