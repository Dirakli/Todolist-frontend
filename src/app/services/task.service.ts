import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  setSelectedStatus(status: string) {
    throw new Error('Method not implemented.');
  }
  getTaskById(id: number) {
    throw new Error('Method not implemented.');
  }
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

  private editMessageSource = new BehaviorSubject<string | null>(null);
  editMessage$ = this.editMessageSource.asObservable();

  private editTaskTextSource = new BehaviorSubject<string | null>(null);
  editTaskText$ = this.editTaskTextSource.asObservable();

  private editTaskIdSource = new BehaviorSubject<number | null>(null);
  editTaskId$ = this.editTaskIdSource.asObservable();
  editIndex$: any;

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

  updateTask(id: number, newText: string, newStatus: string) {
    let task = this.currentTasks.find((t) => t.id === id);
    if (task) {
      task.text = newText;
      task.status = newStatus;
    } else {
      task = this.completedTasks.find((t) => t.id === id);
      if (task) {
        task.text = newText;
        task.status = newStatus;
      }
    }
  }

  setEditMessage(message: string | null) {
    this.editMessageSource.next(message);
  }

  setEditTaskText(taskText: string | null) {
    this.editTaskTextSource.next(taskText);
  }

  setEditTaskId(taskId: number | null) {
    this.editTaskIdSource.next(taskId);
  }
}
