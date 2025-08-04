import { Injectable, OnInit } from '@angular/core';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor() { }

  private tasks: Task[] = [
    { title: 'Task 1', description: 'Description for Task 1', completed: false },
    { title: 'Task 2', description: 'Description for Task 2', completed: true },
    { title: 'Task 3', description: 'Description for Task 3', completed: false },
  ]

  getTasks () : Task[] {
    return [...this.tasks]
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  deleteTask(task: Task): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

}
