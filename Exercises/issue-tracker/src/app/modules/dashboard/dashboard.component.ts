import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { User } from '../../models/user';

type TagSeverity = 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  issues: Issue[] = [];
  filteredIssues: Issue[] = [];
  allUsers: User[] = [];
  currentUser: User | null = null;
  
  searchTerm = '';
  selectedState: string | '' = '';
  selectedAssignee: string | '' = '';
  sortBy: string = 'createdAt';
  sortOrder: 'asc' | 'desc' = 'desc';

  stateOptions = [
    { label: 'All States', value: '' },
    { label: 'New', value: 'new' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Blocked', value: 'blocked' }
  ];

  sortOptions = [
    { label: 'Created Date', value: 'createdAt' },
    { label: 'Due Date', value: 'dueDate' },
    { label: 'Updated Date', value: 'updatedAt' }
  ];

  assigneeOptions: any[] = [];

  private issuesSub: Subscription | null = null;

  constructor(
    private issueService: IssueService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.allUsers = this.authService.getAllUsers() || [];
    this.buildAssigneeOptions();
    this.loadIssues();

    // Subscribe to issue updates if the service exposes an observable
    if (this.issueService.issues$ && this.issueService.issues$.subscribe) {
      this.issuesSub = this.issueService.issues$.subscribe(() => {
        this.loadIssues();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.issuesSub) {
      this.issuesSub.unsubscribe();
      this.issuesSub = null;
    }
  }

  buildAssigneeOptions(): void {
    this.assigneeOptions = [
      { label: 'All Users', value: '' },
      ...this.allUsers.map(user => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user.id
      }))
    ];
  }

  loadIssues(): void {
    this.issues = this.issueService.getAllIssues() || [];
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(): void {
    let filtered: Issue[] = [...(this.issues || [])];

    const term = this.searchTerm?.trim();
    if (term) {
      if (this.issueService.searchIssues) {
        try {
          const results = this.issueService.searchIssues(term);
          if (Array.isArray(results)) {
            filtered = [...results];
          } else {
            filtered = filtered.filter(i =>
              this.issueMatchesSearch(i, term)
            );
          }
        } catch {
          filtered = filtered.filter(i => this.issueMatchesSearch(i, term));
        }
      } else {
        filtered = filtered.filter(i => this.issueMatchesSearch(i, term));
      }
    }

    if (this.selectedState) {
      filtered = filtered.filter(issue => issue.state === this.selectedState);
    }

    if (this.selectedAssignee) {
      filtered = filtered.filter(issue => issue.assignedTo === this.selectedAssignee);
    }

    filtered = [...filtered]; 
    filtered.sort((a: Issue, b: Issue) => {
      const aRaw = (a as any)[this.sortBy];
      const bRaw = (b as any)[this.sortBy];

      if (this.isDateField(this.sortBy)) {
        const aDate = aRaw ? new Date(aRaw).getTime() : 0;
        const bDate = bRaw ? new Date(bRaw).getTime() : 0;
        if (aDate < bDate) return this.sortOrder === 'asc' ? -1 : 1;
        if (aDate > bDate) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      }

      if (typeof aRaw === 'number' && typeof bRaw === 'number') {
        if (aRaw < bRaw) return this.sortOrder === 'asc' ? -1 : 1;
        if (aRaw > bRaw) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      }

      const aStr = (aRaw ?? '').toString().toLowerCase();
      const bStr = (bRaw ?? '').toString().toLowerCase();
      if (aStr < bStr) return this.sortOrder === 'asc' ? -1 : 1;
      if (aStr > bStr) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredIssues = filtered;
  }

  private issueMatchesSearch(issue: Issue, term: string): boolean {
    const t = term.toLowerCase();
    return (
      (issue.title || '').toLowerCase().includes(t) ||
      (issue.id || '').toLowerCase().includes(t) ||
      (this.getUserName(issue.assignedTo) || '').toLowerCase().includes(t)
    );
  }

  private isDateField(field: string): boolean {
    const dateFields = ['createdAt', 'dueDate', 'updatedAt'];
    return dateFields.includes(field);
  }

  onSearch(): void {
    this.applyFiltersAndSort();
  }

  onFilterChange(): void {
    this.applyFiltersAndSort();
  }

  onSortChange(): void {
    this.applyFiltersAndSort();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFiltersAndSort();
  }

  getIssuesByState(state: string): Issue[] {
    return this.filteredIssues.filter(issue => issue.state === state);
  }

  getCountByState(state: string): number {
    return this.filteredIssues.filter(issue => issue.state === state).length;
  }

  getRecentIssues(): Issue[] {
    return [...this.filteredIssues]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }

  getPendingIssues(): Issue[] {
    return this.filteredIssues.filter(issue => 
      issue.state === 'new' || issue.state === 'blocked'
    );
  }

  getUserName(userId?: string | null): string {
    if (!userId) return 'Unassigned';
    const user = this.allUsers.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unassigned';
  }

  getStateSeverity(state: string): TagSeverity {
    switch (state) {
      case 'new':
        return 'info';
      case 'in-progress':
        return 'warning';
      case 'completed':
        return 'success';
      case 'blocked':
        return 'danger';
      default:
        return 'info';
    }
  }

  getDelay(issue: Issue): number {
    return this.issueService.calculateDelay(issue);
  }

  isOverdue(issue: Issue): boolean {
    return this.issueService.isOverdue(issue);
  }

  canEditIssue(issue: Issue): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.role === 'admin' || issue.createdBy === this.currentUser.id;
  }

  canDeleteIssue(issue: Issue): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.role === 'admin' || issue.createdBy === this.currentUser.id;
  }

  viewIssue(issue: Issue): void {
    this.router.navigate(['/issue', issue.id]);
  }

  editIssue(issue: Issue): void {
    this.router.navigate(['/issue/edit', issue.id]);
  }

  deleteIssue(issue: Issue): void {
    if (confirm(`Are you sure you want to delete issue ${issue.id}?`)) {
      try {
        this.issueService.deleteIssue(issue.id);
        this.loadIssues();
      } catch (error: any) {
        alert(error?.message || 'Failed to delete issue');
      }
    }
  }

  createNewIssue(): void {
    this.router.navigate(['/issue/create']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
