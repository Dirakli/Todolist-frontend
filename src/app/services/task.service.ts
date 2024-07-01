import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  currentTasks = [
    {
      id: 1,
      text: 'შექმენით კომპონენტი თასქების სიის გამოსატანად.',
      status: 'მიმდინარე',
    },
  ];

  completedTasks = [
    { id: 1, text: 'დასრულებული დავალების მაგალითი.', status: 'დასრულებული' },
  ];

  addTask(text: string, status: 'მიმდინარე' | 'დასრულებული') {
    const newTask = { id: Date.now(), text, status };
    if (status === 'მიმდინარე') {
      this.currentTasks.push(newTask);
    } else {
      this.completedTasks.push(newTask);
    }
  }

  deleteTask(
    task: { id: number; text: string },
    status: 'მიმდინარე' | 'დასრულებული'
  ) {
    if (status === 'მიმდინარე') {
      this.currentTasks = this.currentTasks.filter((t) => t !== task);
    } else {
      this.completedTasks = this.completedTasks.filter((t) => t !== task);
    }
  }
}
