// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './pages/event-form/event-form.component';

const routes: Routes = [
  { 
    path: 'events/new', 
    component: EventFormComponent 
  },
  { 
    path: 'events/:id/edit', 
    component: EventFormComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }