import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './data.service';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { Priority, TaskItem } from './task-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
  ) { }

  onNewTask(): void {
    this.openDetailDialog();
  }

  openDetailDialog() {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      minWidth: '26em',
      data: {priority: Priority.LOW},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.addTask(result);
    });
  }

  addTask(task: TaskItem): void {
    if (task.name) {
      task.name = task.name.trim();
      this.dataService.addTaskItem(task)
    }
  }
}
