import { Component } from '@angular/core';
import { IconComponent } from '../helpers/icon/icon.component';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-current-task',
  standalone: true,
  imports: [IconComponent, NgFor],
  template: `
    <div class="container">
      <div class="wrapper">
        <app-icon [imagePath]="'/two-arrow-right.svg'"></app-icon>
        <span class="text">მიმდინარე დავალებები</span>
      </div>
      <span class="status">სტატუსი</span>
    </div>
    <div *ngFor="let task of tasks" class="current-wrapper">
      <p class="current-text">{{ task.text }}</p>
      <span class="current">{{ task.status }}</span>
      <div class="delete-edit-wrapper">
        <div class="edit-wrapper">
          <app-icon [imagePath]="'/pencil.svg'"></app-icon>
        </div>
        <button (click)="deleteTask(task)" class="delete">წაშლა</button>
      </div>
    </div>
  `,
  styleUrls: ['./current-task.component.css'],
})
export class CurrentTaskComponent {
  tasks = [
    {
      text: 'შექმენით კომპონენტი თასქების სიის გამოსატანად.',
      status: 'მიმდინარე',
    },
    {
      text: 'შექმენით კომპონენტი თასქების სიის გამოსატანად.',
      status: 'მიმდინარე',
    },
    {
      text: 'შექმენით კომპონენტი თასქების სიის გამოსატანად.',
      status: 'მიმდინარე',
    },
  ];

  deleteTask(task: { text: string; status: string }) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }
}
