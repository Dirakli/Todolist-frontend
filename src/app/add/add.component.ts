import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../helpers/icon/icon.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="wrapper">
      <div class="input-wrapper">
        <label for="input">შეიყვანეთ დასახელება</label>
        <input class="input" id="input" type="text" />
      </div>
      <div class="dropdown" (click)="toggleDropdown()">
        <span class="choose-status">აირჩიეთ დამატების სტატუსი</span>
        <app-icon class="icon" [imagePath]="'/arrow-down.svg'"></app-icon>
        <div *ngIf="dropdownOpen" class="dropdown-menu">
          <div
            class="dropdown-item"
            (click)="selectStatus('მიმდინარე სტატუსი')"
          >
            მიმდინარე სტატუსი
          </div>
          <div
            class="dropdown-item"
            (click)="selectStatus('დასრულებული სტატუსი')"
          >
            დასრულებული სტატუსი
          </div>
        </div>
      </div>

      <button class="btn">
        <app-icon class="btn-icon" [imagePath]="'/plusIcon.svg'"></app-icon>
        <span class="btn-text">დამატება</span>
      </button>
    </div>
  `,
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  dropdownOpen = false;
  selectedStatus: string | null = null;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.dropdownOpen = false;
  }
}
