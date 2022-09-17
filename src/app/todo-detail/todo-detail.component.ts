import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TodoItem } from '../todo-item';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  @Input() todoItem?: TodoItem;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTodoItem();
  }
  
  getTodoItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getTodoItem(id)
      .subscribe(todo => this.todoItem = todo);
  }
  goBack(): void {
    this.location.back();
  }

}
