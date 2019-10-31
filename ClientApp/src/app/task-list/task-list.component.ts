import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  constructor(private taskDataService: TaskService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.taskDataService.get().subscribe(tasks => {
      return this.tasks = tasks;
    });
    }

}
