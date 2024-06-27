import { Component } from '@angular/core';
import { IconComponent } from '../helpers/icon/icon.component';
@Component({
  selector: 'app-current-task',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="container">
      <div class="wrapper">
        <app-icon [imagePath]="'/two-arrow-right.svg'"></app-icon>
        <span class="text">მიმდინარე დავალებები</span>
      </div>
      <span class="status">სტატუსი</span>
    </div>
    <div class="current-wrapper">
      <p class="current-text">შექმენით კომპონენტი თასქების სიის გამოსატანად.</p>
      <span class="current">მიმდინარე</span>
      <div class="delete-edit-wrapper">
        <div class="edit-wrapper">
          <app-icon [imagePath]="'/pencil.svg'"></app-icon>
        </div>
        <button class="delete">წაშლა</button>
      </div>
    </div>

    <div class="current-wrapper">
      <p class="current-text">შექმენით კომპონენტი თასქების სიის გამოსატანად.</p>
      <span class="current">მიმდინარე</span>
      <div class="delete-edit-wrapper">
        <div class="edit-wrapper">
          <app-icon [imagePath]="'/pencil.svg'"></app-icon>
        </div>
        <button class="delete">წაშლა</button>
      </div>
    </div>
  `,
  styleUrl: './current-task.component.css',
})
export class CurrentTaskComponent {}
