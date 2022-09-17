import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { MessageService } from '../message.service';
import { TodoItem } from '../todo-item';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private backendService: BackendService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.getTodoItems();
  }
  getTodoItems(): void {
    this.backendService.getTodoItems()
        .subscribe(todos => this.todoItems = todos);
  }
  
  todoItems: TodoItem[] = [];
  selectedTodoItem?: TodoItem;

  onSelect(todoItem: TodoItem): void {
    this.selectedTodoItem = todoItem;
    this.messageService.add(`TodoListComponent: Selected todo item id=${todoItem.id}`);
  }
}
