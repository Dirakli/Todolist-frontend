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
      (click)="editTask(task)"
    >
      <p class="completed-text">{{ task.text }}</p>
      <span class="completed">{{ task.status }}</span>
      <div class="delete-edit-wrapper">
        <div class="edit-wrapper">
          <app-icon [imagePath]="'/pencil.svg'"></app-icon>
        </div>
        <button (click)="deleteTask(task)" class="delete">წაშლა</button>
      </div>
    </div>
  `,
  styleUrls: ['./completed-task.component.css'],
})
export class CompletedTaskComponent {
  constructor(public taskService: TaskService) {} // Inject TaskService

  editTask(task: { id: number; text: string; status: string }) {
    this.taskService.setEditTaskId(task.id);
    this.taskService.setEditTaskText(task.text);
    this.taskService.setEditMessage('რედაქტირება');
    this.taskService.setSelectedStatus(task.status);
  }

  deleteTask(task: { id: number; text: string }) {
    this.taskService.deleteTask(task, 'დასრულებული');
  }
}
