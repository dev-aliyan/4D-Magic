import { Component, OnInit, Output } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  @Output() task: Task | undefined;
  constructor() {}

  ngOnInit() {
    this.tasks = [
      { title: 'Task 1', description: 'Description for Task 1', completed: false },
      { title: 'Task 2', description: 'Description for Task 2', completed: false },
      { title: 'Task 3', description: 'Description for Task 3', completed: true }
    ];
  }

}
