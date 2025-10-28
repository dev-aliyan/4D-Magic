import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IssueService } from '../../services/issue/issue.service';
import { UserService } from '../../services/user/user.service';
import { Issue } from '../../models/issue';
import { User } from '../../models/user';

/// PrimeNG
import { Card, CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from "primeng/inputtextarea";
import { ViewEncapsulation } from '@angular/core';



type StateKey = Issue['state'];

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule, RouterLink, TitleCasePipe, FormsModule,
    InputTextModule, ButtonModule, TagModule, CardModule,
    ChipModule, TabViewModule, TableModule, RippleModule,
    TooltipModule, TitleCasePipe,
    InputTextareaModule
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {

  private allIssues = signal<Issue[]>([]);
  private users = signal<User[]>([]);

  search = signal<string>('');
  stateFilter = signal<StateKey | 'all'>('all');
  myOnly = signal<boolean>(false);

  currentUser = signal<User | null>(null);

  constructor(
    private issueSvc: IssueService,
    private userSvc: UserService
  ) {
    this.allIssues.set(this.issueSvc.getAllIssues());
    this.users.set(this.userSvc.getAllUsers());
    this.currentUser.set(this.userSvc.getCurrentUser());
    this.issueSvc.issues$.subscribe(list => this.allIssues.set(list));
  }

  // derived data
  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const state = this.stateFilter();
    const me = this.myOnly();
    const meId = this.currentUser()?.id;

    return this.allIssues().filter(i => {
      if (state !== 'all' && i.state !== state) return false;
      if (me && meId && i.assignedTo !== meId) return false;

      if (!q) return true;

      const assignee = this.users().find(u => u.id === i.assignedTo);
      const assigneeName = assignee ? `${assignee.firstName} ${assignee.lastName}`.toLowerCase() : '';
      return (
        i.id.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        assigneeName.includes(q)
      );
    });
  });

  colBacklog = computed(() => this.filtered().filter(i => i.state === 'new'));
  colProgress = computed(() => this.filtered().filter(i => i.state === 'in-progress'));
  colBlocked = computed(() => this.filtered().filter(i => i.state === 'blocked'));
  colDone = computed(() => this.filtered().filter(i => i.state === 'completed'));

  trackById(index: number, item: any): number {
    return item.id;
  }

  kpiTotal = computed(() => this.filtered().length);
  kpiProgress = computed(() => this.filtered().filter(i => i.state === 'in-progress').length);
  kpiCompleted = computed(() => this.filtered().filter(i => i.state === 'completed').length);
  kpiBlocked = computed(() => this.filtered().filter(i => i.state === 'blocked').length);

  assigneeName(id: string): string {
    const u = this.users().find(x => x.id === id);
    return u ? `${u.firstName} ${u.lastName}` : '—';
  }

  stateSeverity(s: StateKey): 'success' | 'info' | 'warning' | 'danger' | 'secondary' {
    switch (s) {
      case 'new': return 'info';
      case 'in-progress': return 'warning';
      case 'completed': return 'success';
      case 'blocked': return 'danger';
      default: return 'secondary';
    }
  }

  clearFilters() {
    this.search.set('');
    this.stateFilter.set('all');
    this.myOnly.set(false);
  }
}
