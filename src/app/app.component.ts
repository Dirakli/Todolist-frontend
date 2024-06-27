import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { IconComponent } from './helpers/icon/icon.component';
import { NoticeComponent } from './notice/notice.component';
import { AddComponent } from './add/add.component';
import { CurrentTaskComponent } from './current-task/current-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    IconComponent,
    NoticeComponent,
    AddComponent,
    CurrentTaskComponent,
    CompletedTaskComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TodoList';
}
