import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { IconComponent } from './helpers/icon/icon.component';
import { NoticeComponent } from './notice/notice.component';
import { AddComponent } from './add/add.component';
import { CurrentTaskComponent } from './current-task/current-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { Task } from './types/task.model';
import { ItemsService } from './newservices/task.service';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TodoList';
}
