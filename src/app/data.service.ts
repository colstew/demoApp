import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { TaskItem } from './task-item';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  initialTaskItems: TaskItem[] = [];
  private dataSub = new BehaviorSubject<TaskItem[]>(this.initialTaskItems);
  currentTasks = this.dataSub.asObservable()

  constructor(
    private backendService: BackendService,
  ) { }

  getTaskItems = ():void => {
    this.backendService.getTaskItems()
      .subscribe(tasks => this.dataSub.next(tasks))
  }
  
  updateTaskItem(task: TaskItem): void {
    this.backendService.updateTaskItem(task)
      .subscribe(this.getTaskItems)
  }

  addTaskItem(task: TaskItem): void {
    this.backendService.addTaskItem(task)
      .subscribe(this.getTaskItems)
  }

  deleteTaskItem(task: TaskItem): void {
    this.backendService.deleteTaskItem(task)
      .subscribe(this.getTaskItems)
  }

}
