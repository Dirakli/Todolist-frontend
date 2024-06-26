import { Component, HostListener } from '@angular/core';
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
      <div class="dropdown" (click)="toggleDropdown($event)">
        <span
          class="choose-status"
          [ngClass]="{
            'status-orange': selectedStatus === 'მიმდინარე სტატუსი',
            'status-sky': selectedStatus === 'დასრულებული სტატუსი'
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
            (click)="selectStatus('მიმდინარე სტატუსი', 'iconOrange')"
          >
            <span>მიმდინარე სტატუსი</span>
            <app-icon
              *ngIf="selectedIcon === 'iconOrange'"
              [imagePath]="'/iconOrange.svg'"
            ></app-icon>
          </div>
          <div
            class="dropdown-item-sky"
            (click)="selectStatus('დასრულებული სტატუსი', 'iconSky')"
          >
            <span>დასრულებული სტატუსი</span>
            <app-icon
              *ngIf="selectedIcon === 'iconSky'"
              [imagePath]="'/iconSky.svg'"
            ></app-icon>
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
  selectedIcon: string | null = null;

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
}
