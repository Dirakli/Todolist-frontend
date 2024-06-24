import { Component } from '@angular/core';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [],
  template: `
    <div class="wrapper">
      <h1 class="notice">შ ე ტ ყ ო ბ ი ნ ე ბ ა !</h1>
      <p class="notice-text">
        სამწუხაროდ დამატებული დავალებები ჯერ არ მოიძებნება.
      </p>
    </div>
  `,
  styleUrl: './notice.component.css',
})
export class NoticeComponent {}
