import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskItem } from './task-item';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = 'https://angulardemotodo.azurewebsites.net/api/todoitems';
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /*GET*/
  getTaskItems(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl)
      .pipe(
        tap(() => {if (isDevMode()) console.log('fetched tasks')}),
        catchError(this.handleError<TaskItem[]>('getTaskItems', []))
      );
  }

  getTaskItem(id: number): Observable<TaskItem> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TaskItem>(url).pipe(
      tap(() => {if (isDevMode()) console.log(`fetched task item id=${id}`)}),
      catchError(this.handleError<TaskItem>(`getTaskItem id=${id}`))
    );
  }
  getHpTaskItems(): Observable<TaskItem[]> {
    const url = `${this.apiUrl}/hp`;
    return this.http.get<TaskItem[]>(url)
      .pipe(
        tap(() => {if (isDevMode()) console.log('fetched high priority tasks')}),
        catchError(this.handleError<TaskItem[]>('getHpTaskItems', []))
      );
  }  

  /*PUT*/
  updateTaskItem(task: TaskItem): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put(url, task, this.httpOptions).pipe(
      tap(() => {if (isDevMode()) console.log(`updated task id=${task.id}`)}),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /*POST*/
  addTaskItem(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task, this.httpOptions).pipe(
      tap((newTask: TaskItem) => {
        if (isDevMode()) console.log(`added task w/ id=${newTask.id}`)}),
      catchError(this.handleError<TaskItem>('addTask'))
    );
  }

  /*DELETE*/
  deleteTaskItem(task: TaskItem): Observable<TaskItem> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<TaskItem>(url, this.httpOptions).pipe(
      tap(() => {if (isDevMode()) console.log(`deleted task id=${task.id}`)}),
      catchError(this.handleError<TaskItem>('deleteTask'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TASK: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TASK: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
