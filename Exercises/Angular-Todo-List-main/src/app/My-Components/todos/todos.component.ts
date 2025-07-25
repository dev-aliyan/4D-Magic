import { TodosService } from './../../Services/todos.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})

export class TodosComponent implements OnInit {
  todos : Todo[] = [];

  constructor(private TodosService : TodosService) {}

  ngOnInit(): void {
    this.todos = this.TodosService.getTodos();
  }

  deleteTodo(todo : Todo) {
    const index = this.todos.indexOf(todo)
    this.todos.splice(index , 1)
  }

  addTodo(todo : Todo) {
    this.todos.push(todo)
  }
}
