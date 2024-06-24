import { Component } from '@angular/core';
import { IconComponent } from '../helpers/icon/icon.component';
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [IconComponent],
  template: `
    <form>
      <div class="input-wrapper">
        <label for="ასიდასიდაიდს">შეიყვანეთ დასახელება</label>
        <input class="input" type="text" />
      </div>
      <div class="dropdown">
        <span>აირჩიეთ დამატების სტატუსი</span>
        <app-icon class="icon" [imagePath]="'/arrow-down.svg'"></app-icon>
      </div>
      <button>დამატება</button>
    </form>
  `,
  styleUrl: './add.component.css',
})
export class AddComponent {}
