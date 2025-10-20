import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IssueService } from '../../../services/issue.service';
import { Issue } from '../../../models/issue';
import { User } from '../../../models/user';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.css']
})
export class ViewIssueComponent implements OnInit {
  issueId: string = '';
  issue: Issue | null = null;
  allUsers: User[] = [];
  currentUser: User | null = null;
  loading = false;
  notFound = false;
  activityLogs: any[] = [];

  constructor(
    private issueService: IssueService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.allUsers = this.authService.getAllUsers();

    this.route.params.subscribe(params => {
      this.issueId = params['id'];
      this.loadIssue();
    });
  }

  loadIssue(): void {
    this.loading = true;
    this.notFound = false;

    const foundIssue = this.issueService.getIssueById(this.issueId);

    if (!foundIssue) {
      this.notFound = true;
      this.loading = false;
      return;
    }

    this.issue = foundIssue;
    this.activityLogs = this.issueService.getActivityLogs(this.issueId);
    this.loading = false;
  }

  getUserName(userId: string): string {
    const user = this.allUsers.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }

  getStateClass(state: string): string {
    switch (state) {
      case 'new':
        return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
      case 'in-progress':
        return 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30';
      case 'completed':
        return 'bg-green-400/20 text-green-300 border-green-400/30';
      case 'blocked':
        return 'bg-red-400/20 text-red-300 border-red-400/30';
      default:
        return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
    }
  }

  getStateIcon(state: string): string {
    switch (state) {
      case 'new':
        return 'pi-circle';
      case 'in-progress':
        return 'pi-spinner';
      case 'completed':
        return 'pi-check-circle';
      case 'blocked':
        return 'pi-lock';
      default:
        return 'pi-circle';
    }
  }

  calculateDelay(): number {
    if (!this.issue) return 0;
    return this.issueService.calculateDelay(this.issue);
  }

  isOverdue(): boolean {
    if (!this.issue) return false;
    return this.issueService.isOverdue(this.issue);
  }

  canEditIssue(): boolean {
    if (!this.currentUser || !this.issue) return false;
    return this.currentUser.role === 'admin' || this.issue.createdBy === this.currentUser.id;
  }

  canDeleteIssue(): boolean {
    if (!this.currentUser || !this.issue) return false;
    return this.currentUser.role === 'admin' || this.issue.createdBy === this.currentUser.id;
  }

  editIssue(): void {
    this.router.navigate(['/issue/edit', this.issueId]);
  }

  deleteIssue(): void {
    if (confirm(`Are you sure you want to delete issue ${this.issueId}?`)) {
      try {
        this.issueService.deleteIssue(this.issueId);
        this.router.navigate(['/dashboard']);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  getActivityActionText(action: string): string {
    switch (action) {
      case 'created':
        return 'Created issue';
      case 'updated':
        return 'Updated issue';
      case 'state_changed':
        return 'Changed state';
      case 'deleted':
        return 'Deleted issue';
      default:
        return action;
    }
  }

  getActivityIcon(action: string): string {
    switch (action) {
      case 'created':
        return 'pi-plus-circle';
      case 'updated':
        return 'pi-pencil';
      case 'state_changed':
        return 'pi-arrow-right';
      case 'deleted':
        return 'pi-trash';
      default:
        return 'pi-clock';
    }
  }
}