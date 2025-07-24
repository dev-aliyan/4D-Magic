import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  @Input() todo! : Todo
  @Output() todoDelete : EventEmitter<Todo> = new EventEmitter()

  constructor() {}

  ngOnInit(): void { }

  onClick (todo : Todo) {
    this.todoDelete.emit(todo)
    console.log('Onclick Triggered')
  }
}
