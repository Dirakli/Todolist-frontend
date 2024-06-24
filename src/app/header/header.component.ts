import { Component } from '@angular/core';
import { NoticeComponent } from '../notice/notice.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NoticeComponent],
  template: `
    <div class="header">
      <h1 class="title">T o - d o List</h1>
    </div>
  `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
