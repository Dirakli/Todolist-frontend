import { Component, OnInit } from '@angular/core';
import { Task } from './types/task.model';
import { ItemsService } from './services/task.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { IconComponent } from './helpers/icon/icon.component';
import { NoticeComponent } from './notice/notice.component';
import { AddComponent } from './add/add.component';
import { CurrentTaskComponent } from './current-task/current-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    IconComponent,
    NoticeComponent,
    AddComponent,
    CurrentTaskComponent,
    CompletedTaskComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TodoList';
  taskToEdit: Task | null = null;
  tasks: Task[] = [];

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const status1$ = this.itemsService.getTasksByStatus(1);
    const status2$ = this.itemsService.getTasksByStatus(2);

    forkJoin([status1$, status2$]).subscribe(
      ([tasks1, tasks2]) => {
        this.tasks = [...tasks1, ...tasks2];
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  onEditTask(task: Task) {
    this.taskToEdit = task;
  }

  onTaskAdded(task: Task) {
    this.tasks.push(task);
    this.taskToEdit = null;
    this.loadTasks();
  }

  onTaskUpdated(task: Task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
    this.taskToEdit = null;
    this.loadTasks();
  }
}
