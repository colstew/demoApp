import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Priority, TaskItem } from '../task-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './hp-tasks.component.html',
  styleUrls: ['./hp-tasks.component.css']
})
export class HpTasksComponent implements OnInit {

  constructor(private dataService: DataService) { }

  hpTaskItems: TaskItem[] = [];

  ngOnInit(): void {
    this.dataService.currentTasks.subscribe(
      tasks => this.hpTaskItems = tasks.filter(
        t => t.priority == Priority.HIGH
      )
    );
    this.dataService.getTaskItems();
  }

}
