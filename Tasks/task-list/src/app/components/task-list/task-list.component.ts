import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  @Input() task!: Task;

  constructor() {}

  ngOnInit(): void {
    // Any initialization logic can go here
  }

}
