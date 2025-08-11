import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list/list.component';
import { DetailsComponent } from './pages/details/details/details.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', component: DetailsComponent },
];

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})

export class EventsModule {}
