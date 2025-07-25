import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})

export class AddTodoComponent implements OnInit {

  todoForm = new FormGroup({
    title : new FormControl('', [Validators.required, Validators.minLength(3)]),
    description : new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  title: string = '';
  description: string = '';

  @Output() todoAdd : EventEmitter<Todo> = new EventEmitter()
  
  constructor () {}

  ngOnInit(): void {
  }

  onSubmit() {
    const todo = {
      title : this.title,
      description : this.description,
      active : true
    }
    this.todoAdd.emit(todo)
  }
}
