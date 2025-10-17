// components/issue/edit-issue/edit-issue.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IssueService } from '../../../services/issue.service';
import { Issue } from '../../../models/issue';
import { User } from '../../../models/user';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit {
  issueId: string = '';
  issue: Issue | null = null;
  title = '';
  description = '';
  state: string = '';
  assignedTo = '';
  estimatedTime: number | null = null;
  completedTime: number | null = null;
  dueDate: Date | null = null;

  allUsers: User[] = [];
  currentUser: User | null = null;
  loading = false;
  error = '';
  success = false;
  notFound = false;
  permissionDenied = false;

  stateOptions = [
    { label: 'New', value: 'new' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Blocked', value: 'blocked' }
  ];

  userOptions: any[] = [];

  originalIssue: Issue | null = null;
  hasChanges = false;

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
    this.buildUserOptions();

    this.route.params.subscribe(params => {
      this.issueId = params['id'];
      this.loadIssue();
    });
  }

  buildUserOptions(): void {
    this.userOptions = this.allUsers.map(user => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user.id
    }));
  }

  loadIssue(): void {
    this.loading = true;
    this.error = '';

    const foundIssue = this.issueService.getIssueById(this.issueId);

    if (!foundIssue) {
      this.notFound = true;
      this.loading = false;
      return;
    }

    if (this.currentUser?.role !== 'admin' && foundIssue.createdBy !== this.currentUser?.id) {
      this.permissionDenied = true;
      this.loading = false;
      return;
    }

    this.originalIssue = JSON.parse(JSON.stringify(foundIssue));
    this.issue = foundIssue;

    this.title = foundIssue.title;
    this.description = foundIssue.description;
    this.state = foundIssue.state;
    this.assignedTo = foundIssue.assignedTo;
    this.estimatedTime = foundIssue.estimatedTime;
    this.completedTime = foundIssue.completedTime;
    this.dueDate = new Date(foundIssue.dueDate);

    this.loading = false;
  }

  onInputChange(): void {
    this.checkForChanges();
  }

  onValueChange(event: any): void {
    console.log('State changed to:', event.value);
    this.checkForChanges();
  }


  checkForChanges(): void {
    if (!this.originalIssue) return;

    this.hasChanges = 
      this.title !== this.originalIssue.title ||
      this.description !== this.originalIssue.description ||
      this.state !== this.originalIssue.state ||
      this.assignedTo !== this.originalIssue.assignedTo ||
      this.estimatedTime !== this.originalIssue.estimatedTime ||
      this.completedTime !== this.originalIssue.completedTime ||
      new Date(this.dueDate || '').getTime() !== new Date(this.originalIssue.dueDate).getTime();
  }

  onSubmit(): void {
    this.error = '';
    this.success = false;

    // Validation
    if (!this.title.trim()) {
      this.error = 'Issue title is required.';
      return;
    }

    if (this.title.trim().length < 5) {
      this.error = 'Issue title must be at least 5 characters long.';
      return;
    }

    if (!this.description.trim()) {
      this.error = 'Issue description is required.';
      return;
    }

    if (this.description.trim().length < 10) {
      this.error = 'Issue description must be at least 10 characters long.';
      return;
    }

    if (!this.estimatedTime || this.estimatedTime <= 0) {
      this.error = 'Estimated time must be greater than 0 hours.';
      return;
    }

    if (this.estimatedTime > 1000) {
      this.error = 'Estimated time cannot exceed 1000 hours.';
      return;
    }

    if (!this.completedTime || this.completedTime < 0) {
      this.error = 'Completed time cannot be negative.';
      return;
    }

    if (this.completedTime > 1000) {
      this.error = 'Completed time cannot exceed 1000 hours.';
      return;
    }

    if (!this.dueDate) {
      this.error = 'Due date is required.';
      return;
    }

    if (!this.assignedTo) {
      this.error = 'Please assign this issue to a user.';
      return;
    }

    this.loading = true;

    try {
      const updates = {
        title: this.title.trim(),
        description: this.description.trim(),
        state: this.state as 'new' | 'in-progress' | 'completed' | 'blocked',
        estimatedTime: this.estimatedTime!,
        completedTime: this.completedTime!,
        dueDate: this.dueDate as Date,
        assignedTo: this.assignedTo
      };

      this.issueService.updateIssue(this.issueId, updates);

      this.success = true;
      this.originalIssue = JSON.parse(JSON.stringify(this.issue));
      this.hasChanges = false;

      setTimeout(() => {
        this.router.navigate(['/issue', this.issueId]);
      }, 1500);
    } catch (err: any) {
      this.error = err.message || 'Failed to update issue. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  onCancel(): void {
    if (this.hasChanges) {
      if (confirm('You have unsaved changes. Do you want to discard them?')) {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  resetForm(): void {
    if (!this.originalIssue) return;

    this.title = this.originalIssue.title;
    this.description = this.originalIssue.description;
    this.state = this.originalIssue.state;
    this.assignedTo = this.originalIssue.assignedTo;
    this.estimatedTime = this.originalIssue.estimatedTime;
    this.completedTime = this.originalIssue.completedTime;
    this.dueDate = new Date(this.originalIssue.dueDate);
    this.error = '';
    this.hasChanges = false;
  }

  getMinDueDate(): Date {
    return new Date();
  }

  getUserName(userId: string): string {
    const user = this.allUsers.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }

  getCreatorName(userId: string): string {
    const user = this.allUsers.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }

  calculateDelay(): number {
    if (!this.issue) return 0;
    return this.issueService.calculateDelay(this.issue);
  }

  getStateColor(state: string): string {
    switch (state) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  canMarkAsCompleted(): boolean {
    return this.state === 'completed' && this.completedTime === 0;
  }

  markAsCompleted(): void {
    this.state = 'completed';
    this.completedTime = this.estimatedTime;
    this.checkForChanges();
  }

  deleteIssue(): void {
    if (confirm(`Are you sure you want to delete issue ${this.issueId}? This action cannot be undone.`)) {
      try {
        this.issueService.deleteIssue(this.issueId);
        this.router.navigate(['/dashboard']);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }
}