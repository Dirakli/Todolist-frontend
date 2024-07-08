import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IconComponent } from '../helpers/icon/icon.component';
import { CommonModule, NgFor } from '@angular/common';
import { Task } from '../types/task.model';
import { ItemsService } from '../newservices/task.service';

@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [IconComponent, NgFor, CommonModule],
  template: `
    <div class="container">
      <div class="wrapper">
        <app-icon [imagePath]="'/compl-icon.svg'"></app-icon>
        <span class="text">დასრულებული დავალებები</span>
      </div>
      <span class="status">სტატუსი</span>
    </div>
    <div *ngIf="loading">loading...</div>
    <div *ngFor="let task of tasks" class="completed-wrapper">
      <p class="completed-text">{{ task.name }}</p>
      <span class="completed">{{
        task.status === 2 ? 'დასრულებული' : 'მიმდინარე'
      }}</span>
      <div class="delete-edit-wrapper">
        <div
          class="edit-wrapper"
          (click)="editTask.emit(task)"
          (click)="onEditTask(task)"
          [ngStyle]="{
            'background-color': editIndex === task.id ? '#FFDF8C' : ''
          }"
        >
          <app-icon [imagePath]="'/pencil.svg'"></app-icon>
        </div>
        <button (click)="deleteTask(task)" class="delete">წაშლა</button>
      </div>
    </div>
  `,
  styleUrls: ['./completed-task.component.css'],
})
export class CompletedTaskComponent implements OnInit {
  @Output() editTask = new EventEmitter<Task>();

  loading = true;
  tasks: Task[] = [];
  error: string | null = null;
  editIndex: number | undefined;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    const status = 2;
    this.itemsService.getTasksByStatus(status).subscribe(
      (response) => {
        this.loading = false;
        this.tasks = response;
      },
      (error) => {
        this.loading = false;
        this.error = error;
        console.error('Error fetching tasks:', error);
      }
    );
  }

  onEditTask(task: Task): void {
    this.editIndex = task.id;
    this.editTask.emit(task);
  }

  deleteTask(task: Task) {
    this.itemsService.deleteTask(task.id).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      (error) => {
        console.error('Failed to delete task:', error);
      }
    );
  }
}
