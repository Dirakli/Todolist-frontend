import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IconComponent } from '../helpers/icon/icon.component';
import { CommonModule, NgFor } from '@angular/common';
import { Task } from '../types/task.model';
import { ItemsService } from '../services/task.service';
import { EditStateService } from '../services/edit.service';

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
  styleUrls: ['./current-task.component.css'],
})
export class CurrentTaskComponent implements OnInit {
  @Output() editTask = new EventEmitter<Task>();

  loading = true;
  tasks: Task[] = [];
  error: string | null = null;
  editIndex: number | undefined;

  constructor(
    private itemsService: ItemsService,
    private editStateService: EditStateService
  ) {}

  ngOnInit(): void {
    this.itemsService.currentTasks$.subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.error = error;
        console.error('Error fetching tasks:', error);
      }
    );

    this.editStateService.editIndex$.subscribe((index: number | undefined) => {
      this.editIndex = index;
    });
  }

  onEditTask(task: Task): void {
    if (this.editIndex === task.id) {
      // If the current task is already being edited, reset the edit index
      this.editStateService.setEditIndex(undefined);
    } else {
      // Set the edit index to the current task's id
      this.editStateService.setEditIndex(task.id);
      this.editTask.emit(task);
    }
  }

  deleteTask(task: Task): void {
    this.itemsService.deleteTask(task.id).subscribe(
      () => {},
      (error) => {
        console.error('Failed to delete task:', error);
      }
    );
  }
}
