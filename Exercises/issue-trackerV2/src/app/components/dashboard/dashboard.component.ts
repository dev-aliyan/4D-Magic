import { Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IssueService } from '../../services/issue/issue.service';
import { UserService } from '../../services/user/user.service';
import { Issue } from '../../models/issue';
import { User } from '../../models/user';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { DialogModule } from 'primeng/dialog';
import { CreateIssueComponent } from '../issue/create-issue/create-issue.component';
import { EditIssueComponent } from '../issue/edit-issue/edit-issue.component';
import { ViewIssueComponent } from '../issue/view-issue/view-issue.component';

type StateKey = Issue['state'];

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule, RouterLink, TitleCasePipe, FormsModule,
    InputTextModule, ButtonModule, TagModule, CardModule,
    ChipModule, TabViewModule, TableModule, RippleModule,
    TooltipModule, TitleCasePipe, InputTextareaModule,
    DragDropModule, DialogModule, CreateIssueComponent,
    EditIssueComponent, ViewIssueComponent
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

  showCreateModal = signal<boolean>(false);
  showEditModal = signal<boolean>(false);
  showViewModal = signal<boolean>(false);
  selectedIssueId = signal<string>('');

  constructor(
    private issueSvc: IssueService,
    private userSvc: UserService
  ) {
    this.allIssues.set(this.issueSvc.getAllIssues());
    this.users.set(this.userSvc.getAllUsers());
    this.currentUser.set(this.userSvc.getCurrentUser());
    this.issueSvc.issues$.subscribe(list => this.allIssues.set(list));
  }

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

  createdByName(id: string): string {
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

  drop(event: CdkDragDrop<Issue[]>, newState: StateKey) {
    if (event.previousContainer === event.container) return;

    const item = event.previousContainer.data[event.previousIndex];
    
    this.issueSvc.updateIssue(item.id, { state: newState });
    
    this.allIssues.set([...this.issueSvc.getAllIssues()]);
  }

  clearFilters() {
    this.search.set('');
    this.stateFilter.set('all');
    this.myOnly.set(false);
  }

  openCreateModal() {
    this.showCreateModal.set(true);
  }

  openViewModal(issueId: string) {
    this.selectedIssueId.set(issueId);
    this.showViewModal.set(true);
  }

  openEditModal(issueId: string) {
    this.selectedIssueId.set(issueId);
    this.showEditModal.set(true);
  }

  closeCreateModal() {
    this.showCreateModal.set(false);
  }

  closeViewModal() {
    this.showViewModal.set(false);
    this.selectedIssueId.set('');
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.selectedIssueId.set('');
  }

  onIssueCreated() {
    this.closeCreateModal();
    this.allIssues.set([...this.issueSvc.getAllIssues()]);
  }

  onIssueUpdated() {
    this.closeEditModal();
    this.allIssues.set([...this.issueSvc.getAllIssues()]);
  }

  onIssueDeleted() {
    this.closeViewModal();
    this.allIssues.set([...this.issueSvc.getAllIssues()]);
  }

  onEditFromView(issueId: string) {
    this.closeViewModal();
    this.openEditModal(issueId);
  }
}