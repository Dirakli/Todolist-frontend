import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<img [src]="imagePath" />`,
  styleUrls: ['./icon.component.css'],
})
export class IconComponent {
  @Input() imagePath: string = '';
}
