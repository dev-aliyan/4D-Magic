import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../services/task-service.service';
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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  addTask(task: Task) {
    this.taskService.addTask(task);
    this.tasks = this.taskService.getTasks(); 
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
    this.tasks = this.taskService.getTasks();
  }
}
