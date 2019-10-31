import { Injectable, Inject } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
  constructor( private http: HttpClient,@Inject('BASE_URL') private baseUrl:string ) { }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl+'api/Task', task, httpOptions).pipe(
      tap((newTask: Task) => this.log(`Se registro la informacion con el id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
      );
  }

searchTask(id: number): Observable<Task> {
    const url = `${this.baseUrl + 'api/Task'}/${id}`;
  return this.http.get<Task>(url).pipe(
    tap(_ => this.log(`Se encontro la tarea ${id}`)),
    catchError(this.handleError<Task>(`searchTask id=${id}`))
  );
}


get(): Observable<Task[]> {
  return this.http.get<Task[]>(this.baseUrl+'api/Task').pipe(
    catchError(this.handleError<Task[]>('get', [])));
}


  updateTask(task: Task): Observable<any> {
    const url = `${this.baseUrl + 'api/Task'}/${task.id}`;
  return this.http.put(url, task, httpOptions).pipe(
    tap(_ => this.log(`Se actualizo la tarea con id=${task.id}`)),
    catchError(this.handleError<any>('updateTask'))
  );
}

  delete(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.baseUrl + 'api/Task'}/${id}`;
    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => this.log(`Se actualizo la tarea con id=${id}`)),
      catchError(this.handleError<any>('deleteTask'))
    );
  }
  private log(message: string) {
   // this.messageService.add(`taskService: ${message}`);
   alert(`taskService: ${message}`);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
        // TODO: better job of transforming error for user consumption
      this.log(`${operation} Fallo: ${error.message}`);
        // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
