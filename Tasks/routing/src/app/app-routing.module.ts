import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'events',
    loadChildren : () => import('./events/events.module').then(m => m.EventsModule)
  },
  {
    path : 'admin',
    loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path : '',
    redirectTo : 'events',
    pathMatch : 'full'
  },
  {
    path : '**',
    redirectTo: 'events'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
