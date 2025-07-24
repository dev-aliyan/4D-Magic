import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  @Input() todo! : Todo
  @Output() todoDelete : EventEmitter<Todo> = new EventEmitter()
  @Output() detailsToggled = new EventEmitter<boolean>();

  showDescription: boolean = false;

  constructor() {}

  ngOnInit(): void { }

  onClick (todo : Todo) {
    this.todoDelete.emit(todo)
    console.log('Onclick Triggered')
  }

  onDetailsToggled(state: boolean) {
    this.showDescription = state;
    this.detailsToggled.emit(state);
  }

  
}
