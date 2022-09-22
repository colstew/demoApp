import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskItem } from '../task-item';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {

 constructor(
    @Inject(MAT_DIALOG_DATA) public taskItem: TaskItem,
    public dialogRef: MatDialogRef<TaskDetailComponent>,
  ) { }

  public selectedPriority = String(this.taskItem.priority);
  public onSelectChange(): void {
    this.taskItem.priority = Number(this.selectedPriority);
  }

}
