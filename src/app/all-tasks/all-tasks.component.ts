import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TaskItem } from '../task-item';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  taskItems: TaskItem[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentTasks
      .subscribe(tasks => this.taskItems = tasks);
    this.dataService.getTaskItems();
  }
}
