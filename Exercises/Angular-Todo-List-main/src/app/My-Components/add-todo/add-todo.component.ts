import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})

export class AddTodoComponent implements OnInit {
  title: string = '';
  description: string = '';

  @Output() todoAdd : EventEmitter<Todo> = new EventEmitter()
  
  constructor () {}

  ngOnInit(): void {
  }

  onSubmit() {
    const todo = {
      sno : 8,
      title : this.title,
      description : this.description,
      active : true
    }
    this.todoAdd.emit(todo)
  }
}
