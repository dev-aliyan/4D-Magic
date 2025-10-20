import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { EditIssueComponent } from './edit-issue/edit-issue.component';
import { ViewIssueComponent } from './view-issue/view-issue.component';

const routes: Routes = [
  { path: 'create', component: CreateIssueComponent },
  { path: 'edit/:id', component: EditIssueComponent },
  { path: ':id', component: ViewIssueComponent }
];

@NgModule({
  declarations: [CreateIssueComponent, EditIssueComponent, ViewIssueComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class IssueModule {}
