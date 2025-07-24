import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-show-todo',
  templateUrl: './show-todo.component.html',
  styleUrl: './show-todo.component.css'
})
export class ShowTodoComponent {
  @Output() changedState : EventEmitter<boolean> = new EventEmitter();
  @Input() todo! : Todo;

  clickedState : boolean = false;
  buttonText : string = 'Show Details'

  onClick() {
    this.clickedState = !this.clickedState;
    this.changedState.emit(this.clickedState)
    this.buttonText = this.clickedState ? 'Hide Details' : 'Show Details';
  }
}
