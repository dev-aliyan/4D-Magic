import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Input() taskTitle: string = '';
  @Input() description: string = '';

  @Output() taskAdd: EventEmitter<Task> = new EventEmitter();

  onSubmit() {
    const newTask: Task = {
      title: this.taskTitle,
      description: this.description,
      completed: false
    };

    this.taskAdd.emit(newTask);
  }
}
