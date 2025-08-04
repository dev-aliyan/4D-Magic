import { Task } from './../../Task';  
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {
  @Input() task! : Task;
  @Output() taskDelete : EventEmitter<Task> = new EventEmitter() 

  onClick () {
    this.taskDelete.emit(this.task)
  }
}
