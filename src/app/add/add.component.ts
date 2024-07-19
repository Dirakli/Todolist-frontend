import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../helpers/icon/icon.component';
import { Task } from '../types/task.model';
import { ItemsService } from '../services/task.service';
import { NoticeComponent } from '../notice/notice.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, NoticeComponent],
  template: `
    <div *ngIf="isStatus1Empty && isStatus2Empty" class="wrapper-add">
      <app-icon [imagePath]="'/add-icon.svg'"></app-icon>
      <span class="add-task">ახალი დავალების დამატება</span>
    </div>
    <div class="wrapper">
      <div *ngIf="!isStatus1Empty || !isStatus2Empty" class="wrapper-add">
        <app-icon [imagePath]="'/add-icon.svg'"></app-icon>
        <span class="add-task">ახალი დავალების დამატება</span>
      </div>
      <div class="input-wrapper">
        <label for="input">
          {{
            taskBeingEdited ? 'შეცვალეთ დასახელება' : ' შეიყვანეთ დასახელება'
          }}
        </label>
        <input [(ngModel)]="taskText" class="input" id="input" type="text" />
        <div *ngIf="taskTextError" class="error-message">
          გთხოვთ შეიყვანოთ დასახელება
        </div>
      </div>
      <div class="dropdown" (click)="toggleDropdown($event)">
        <span
          class="choose-status"
          [ngClass]="{
            'status-orange': selectedStatus === statuses.current,
            'status-sky': selectedStatus === statuses.completed
          }"
        >
          {{ selectedStatus || 'აირჩიეთ დავალების სტატუსი' }}
        </span>
        <app-icon
          class="icon"
          [imagePath]="dropdownOpen ? '/arrow-down.svg' : '/arrow-up.svg'"
        ></app-icon>
        <div *ngIf="dropdownOpen" class="dropdown-menu">
          <div
            class="dropdown-item-orange"
            (click)="selectStatus(statuses.current, 'icon-orange')"
          >
            <span>{{ statuses.current }}</span>
            <app-icon
              *ngIf="selectedIcon === 'icon-orange'"
              [imagePath]="'/icon-orange.svg'"
            ></app-icon>
          </div>
          <div
            class="dropdown-item-sky"
            (click)="selectStatus(statuses.completed, 'icon-sky')"
          >
            <span>{{ statuses.completed }}</span>
            <app-icon
              *ngIf="selectedIcon === 'icon-sky'"
              [imagePath]="'/icon-sky.svg'"
            ></app-icon>
          </div>
        </div>
      </div>
      <button class="btn" (click)="addTask()">
        <app-icon
          class="btn-icon"
          [imagePath]="dropdownOpen ? '/edit-icon.svg' : '/plus-icon.svg'"
        ></app-icon>
        <span class="btn-text">
          {{ taskBeingEdited ? 'რედაქტირება' : 'დამატება' }}
        </span>
      </button>
    </div>
  `,
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  @Input() set editTask(task: Task | null) {
    if (task) {
      this.taskText = task.name;
      this.selectedStatus =
        task.status === 1 ? this.statuses.current : this.statuses.completed;
      this.selectedIcon = task.status === 1 ? 'icon-orange' : 'icon-sky';
      this.taskBeingEdited = task;
    } else {
      this.resetForm();
    }
  }

  @Output() taskAdded = new EventEmitter<Task>();

  dropdownOpen = false;
  selectedStatus: string | null = null;
  selectedIcon: string | null = null;
  taskText: string = '';
  taskBeingEdited: Task | null = null;

  taskTextError: boolean = false;
  statusError: boolean = false;

  statuses = {
    current: 'მიმდინარე სტატუსი',
    completed: 'დასრულებული სტატუსი',
  };

  isStatus1Empty = true;
  isStatus2Empty = true;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.getTasksByStatus(1).subscribe((tasks) => {
      this.isStatus1Empty = tasks.length === 0;
    });

    this.itemsService.getTasksByStatus(2).subscribe((tasks) => {
      this.isStatus2Empty = tasks.length === 0;
    });
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectStatus(status: string, icon: string) {
    this.selectedStatus = status;
    this.selectedIcon = icon;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }

  addTask() {
    this.taskTextError = !this.taskText;
    this.statusError = !this.selectedStatus;

    if (!this.taskTextError && !this.statusError) {
      const statusId = this.selectedStatus === this.statuses.current ? 1 : 2;
      const newTask: Partial<Task> = {
        name: this.taskText,
        status: statusId,
      };

      if (this.taskBeingEdited) {
        newTask.id = this.taskBeingEdited.id;
        this.itemsService.updateTask(newTask.id!, newTask).subscribe(
          (updatedTask: any) => {
            this.taskAdded.emit(updatedTask);
            this.resetForm();
            this.refreshTaskStatuses();
          },
          (error: any) => {
            console.error('Error updating task:', error);
          }
        );
      } else {
        this.itemsService.addTask(newTask).subscribe(
          (response: any) => {
            this.taskAdded.emit(response);
            this.resetForm();
            this.refreshTaskStatuses();
          },
          (error: any) => {
            console.error('Error adding task:', error);
          }
        );
      }
    } else {
      console.warn('Please enter task text and select a status.');
    }
  }

  resetForm() {
    this.taskText = '';
    this.selectedStatus = null;
    this.selectedIcon = null;
    this.taskBeingEdited = null;
    this.taskTextError = false;
    this.statusError = false;
  }

  refreshTaskStatuses() {
    this.itemsService.getTasksByStatus(1).subscribe((tasks) => {
      this.isStatus1Empty = tasks.length === 0;
    });

    this.itemsService.getTasksByStatus(2).subscribe((tasks) => {
      this.isStatus2Empty = tasks.length === 0;
    });
  }
}
