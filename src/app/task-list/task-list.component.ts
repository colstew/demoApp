import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service'
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskItem } from '../task-item';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  @Input() taskItems: TaskItem[] = [];

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
  ) { }

  onCheckChange(checked: boolean, task: TaskItem) :void {
    task.isComplete = checked;
    this.dataService.updateTaskItem(task);
  }

  onMoreClick(task: TaskItem): void {
    this.openDetailDialog(task);
  }
 
  onDeleteClick(task: TaskItem): void{
    this.deleteTask(task);
  }

  openDetailDialog(task: TaskItem) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      minWidth: '26em',
      data: {...task},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateTaskItem(result)
      }
    });
  }
  
  deleteTask(task: TaskItem): void {
    this.dataService.deleteTaskItem(task);
  }
}
