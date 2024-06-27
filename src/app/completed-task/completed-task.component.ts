import { Component } from '@angular/core';
import { IconComponent } from '../helpers/icon/icon.component';
import { CommonModule, NgFor } from '@angular/common';
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
    <div *ngFor="let task of tasks" class="current-wrapper">
      <p class="current-text">{{ task.text }}</p>
      <span class="current">{{ task.status }}</span>
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
  tasks = [
    {
      id: 1,
      text: 'შექმენით კომპონენტი თასქების სიის გამოსატანად.',
      status: 'მიმდინარე',
      editing: false,
    },
    {
      id: 2,
      text: 'შექმენით კომპონენტი თასქების სიის გამოსატანად.',
      status: 'მიმდინარე',
      editing: false,
    },
    {
      id: 3,
      text: 'შექმენით კომპონენტი თასქების სიის გამოსატანად.',
      status: 'მიმდინარე',
      editing: false,
    },
  ];

  editIndex: { id: number; text: string } | null = null;

  toggleEdit(task: { id: number; text: string }) {
    if (this.editIndex && this.editIndex.id === task.id) {
      this.editIndex = null;
    } else {
      this.editIndex = task;
    }
  }

  deleteTask(task: { id: number; text: string }) {
    this.tasks = this.tasks.filter((t) => t !== task);
    if (this.editIndex && this.editIndex.id === task.id) {
      this.editIndex = null;
    }
  }
}
