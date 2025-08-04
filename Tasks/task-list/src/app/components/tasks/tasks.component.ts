import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  taskTitle: string = '';
  description: string = '';
  completed: boolean = false;

  ngOnInit() {
    this.tasks = [
      { title: 'Task 1', description: 'Description for Task 1', completed: false },
      { title: 'Task 2', description: 'Description for Task 2', completed: true }
    ];
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
