import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../helpers/icon/icon.component';
import { ItemsService } from '../newservices/task.service';
import { Task } from '../types/task.model';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="wrapper">
      <div class="input-wrapper">
        <label for="input">შეიყვანეთ დასახელება</label>
        <input [(ngModel)]="taskText" class="input" id="input" type="text" />
      </div>
      <div class="dropdown" (click)="toggleDropdown($event)">
        <span
          class="choose-status"
          [ngClass]="{
            'status-orange': selectedStatus === statuses.current,
            'status-sky': selectedStatus === statuses.completed
          }"
        >
          {{ selectedStatus || 'აირჩიეთ დამატების სტატუსი' }}
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
        <app-icon class="btn-icon" [imagePath]="'/plus-icon.svg'"></app-icon>
        <span class="btn-text">დამატება</span>
      </button>
    </div>
  `,
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  dropdownOpen = false;
  selectedStatus: string | null = null;
  selectedIcon: string | null = null;
  taskText: string = '';

  statuses = {
    current: 'მიმდინარე სტატუსი',
    completed: 'დასრულებული სტატუსი',
  };

  constructor(private itemsService: ItemsService) {}

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
    if (this.taskText && this.selectedStatus) {
      const statusId = this.selectedStatus === this.statuses.current ? 1 : 2;

      const newTask: Partial<Task> = {
        name: this.taskText,
        status: statusId,
      };

      this.itemsService.addTask(newTask).subscribe(
        (response) => {
          console.log('Task added successfully:', response);
          this.taskText = '';
          this.selectedStatus = null;
          this.selectedIcon = null;
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
    } else {
      console.warn('Please enter task text and select a status.');
    }
  }
}
