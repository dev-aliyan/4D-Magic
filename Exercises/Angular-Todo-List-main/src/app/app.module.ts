import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './My-Components/todos/todos.component';
import { TodoHeaderComponent } from './My-Components/todo-header/todo-header.component';
import { TodoFooterComponent } from './My-Components/todo-footer/todo-footer.component';
import { MainComponent } from './My-Components/main/main.component';
import { TodoListComponent } from "./My-Components/todo-list/todo-list.component";
import { AddTodoComponent } from './My-Components/add-todo/add-todo.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowTodoComponent } from './My-Components/show-todo/show-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoHeaderComponent,
    TodoFooterComponent,
    MainComponent,
    AddTodoComponent,
    TodoListComponent,
    ShowTodoComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }