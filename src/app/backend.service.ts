import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from './todo-item';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`BackendService: ${message}`);
  }

  private readonly apiUrl = 'https://angulardemotodo.azurewebsites.net/api/todoitems';
  getTodoItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log('fetched todos')),
        catchError(this.handleError<TodoItem[]>('getTodoItems', []))
      );
  }

  /** GET todo item by id. Will 404 if id not found */
  getTodoItem(id: number): Observable<TodoItem> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TodoItem>(url).pipe(
      tap(_ => this.log(`fetched todo item id=${id}`)),
      catchError(this.handleError<TodoItem>(`getTodoItem id=${id}`))
    );
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
