import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})

export class TaskAddComponent implements OnInit {
  task: Task;
  tasks:Task[];
  constructor(private taskDataService: TaskService) { }
  ngOnInit() {
    this.task = new Task();
  }

  add(): void {
    if (!this.task) { return; }
    this.taskDataService.addTask(this.task)
      .subscribe( task  => {
          alert('Se agrego una nueva tarea =>'+task.id);
             });
  }

   delete(task: Task): void {
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskDataService.delete(task).subscribe();
  } 

}
