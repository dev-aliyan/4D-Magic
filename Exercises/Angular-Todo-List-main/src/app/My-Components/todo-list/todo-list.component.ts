import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  @Input() todo! : Todo

  constructor() {}

  ngOnInit(): void {
    
  }
}
