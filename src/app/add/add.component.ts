import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { IconComponent } from '../helpers/icon/icon.component';
import { TaskService } from '../services/task.service'; // Import TaskService

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent], // Include FormsModule
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

  constructor(private taskService: TaskService) {} // Inject TaskService

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectStatus(status: string, icon: string) {
    this.selectedStatus = status;
    this.selectedIcon = icon;
  }

  addTask() {
    if (this.taskText.trim() && this.selectedStatus) {
      this.taskService.addTask(
        this.taskText,
        this.selectedStatus === this.statuses.current
          ? 'მიმდინარე'
          : 'დასრულებული'
      );
      this.taskText = '';
      this.selectedStatus = null;
      this.selectedIcon = null;
      this.dropdownOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }
}
