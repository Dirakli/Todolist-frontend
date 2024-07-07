import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../helpers/icon/icon.component';
import { CommonModule, NgFor } from '@angular/common';
import { Task } from '../types/task.model';
import { ItemsService } from '../newservices/task.service';

@Component({
  selector: 'app-current-task',
  standalone: true,
  imports: [IconComponent, NgFor, CommonModule],
  template: `
    <div class="container">
      <div class="wrapper">
        <app-icon [imagePath]="'/two-arrow-right.svg'"></app-icon>
        <span class="text">მიმდინარე დავალებები</span>
      </div>
      <span class="status">სტატუსი</span>
    </div>

    <div *ngIf="loading">loading...</div>
    <div *ngFor="let task of tasks" class="current-wrapper">
      <p class="current-text">{{ task.name }}</p>
      <span class="current">{{
        task.status === 1 ? 'მიმდინარე' : 'დასრულებული'
      }}</span>
      <div class="delete-edit-wrapper">
        <div
          class="edit-wrapper"
          [ngStyle]="{
            'background-color': editIndex === task.id ? '#FFDF8C' : ''
          }"
          (click)="toggleEdit(task)"
        >
          <app-icon [imagePath]="'/pencil.svg'"></app-icon>
        </div>
        <button (click)="deleteTask(task)" class="delete">წაშლა</button>
      </div>
    </div>
  `,
  styleUrls: ['./current-task.component.css'],
})
export class CurrentTaskComponent implements OnInit {
  editIndex: number | null = null;
  loading = true;
  tasks: Task[] = [];
  error: string | null = null;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    const status = 1;
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

  toggleEdit(task: Task) {
    this.editIndex = this.editIndex === task.id ? null : task.id;
  }

  cancelEdit() {
    this.editIndex = null;
  }

  addTask(text: string, status: 1 | 2) {
    const newTask: Partial<Task> = { name: text, status };
    this.itemsService.addTask(newTask).subscribe(
      (addedTask) => {
        this.tasks = [...this.tasks, addedTask];
      },
      (error) => {
        console.error('Failed to add task:', error);
      }
    );
  }

  deleteTask(task: Task) {
    this.itemsService.deleteTask(task.id).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        if (this.editIndex === task.id) {
          this.cancelEdit();
        }
      },
      (error) => {
        console.error('Failed to delete task:', error);
      }
    );
  }

  updateTask(task: Task) {
    this.itemsService.updateTask(task.id, task).subscribe(
      () => {
        if (this.editIndex === task.id) {
          this.cancelEdit();
        }
      },
      (error) => {
        console.error('Failed to update task:', error);
      }
    );
  }
}
