import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { TodoItem } from '../todo-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.getTodoItems();
  }

  getTodoItems(): void {
    this.backendService.getTodoItems()
      .subscribe(todos => this.todoItems = todos.slice(1, 5));
  }

  todoItems: TodoItem[] = [];

}
