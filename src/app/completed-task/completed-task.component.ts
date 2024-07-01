import { Component } from '@angular/core';
import { IconComponent } from '../helpers/icon/icon.component';
import { CommonModule, NgFor } from '@angular/common';
import { TaskService } from '../services/task.service'; // Import TaskService

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
    <div
      *ngFor="let task of taskService.completedTasks"
      class="completed-wrapper"
    >
      <p class="completed-text">{{ task.text }}</p>
      <span class="completed">{{ task.status }}</span>
      <div class="delete-edit-wrapper">
        <div
          class="edit-wrapper"
          [ngStyle]="{
            'background-color': editIndex === task ? '#FFDF8C' : ''
          }"
          (click)="toggleEdit(task)"
        >
          <app-icon [imagePath]="'/pencil.svg'"></app-icon>
        </div>
        <button (click)="deleteTask(task)" class="delete">წაშლა</button>
      </div>
    </div>
  `,
  styleUrls: ['./completed-task.component.css'],
})
export class CompletedTaskComponent {
  editIndex: { id: number; text: string } | null = null;

  constructor(public taskService: TaskService) {} // Inject TaskService

  toggleEdit(task: { id: number; text: string }) {
    this.editIndex = this.editIndex?.id === task.id ? null : task;
  }

  deleteTask(task: { id: number; text: string }) {
    this.taskService.deleteTask(task, 'დასრულებული');
    if (this.editIndex?.id === task.id) {
      this.editIndex = null;
    }
  }
}
