import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { IssueService } from '../../../services/issue.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {
  title = '';
  description = '';
  assignedTo = '';
  estimatedTime: number | null = null;
  dueDate: Date | null = null;

  allUsers: User[] = [];
  currentUser: User | null = null;
  loading = false;
  error = '';
  success = false;
  userOptions: any[] = [];

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

    this.allUsers = this.authService.getAllUsers();
    this.buildUserOptions();
    this.assignedTo = this.currentUser.id;
  }

  buildUserOptions(): void {
    this.userOptions = this.allUsers.map(user => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user.id
    }));
  }

  onDateSelect(date: Date) {
    this.dueDate = new Date(date);
    console.log('📅 Selected Due Date:', this.dueDate);
  }

  getMinDueDate(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }

  onSubmit(): void {
    this.error = '';
    this.success = false;

    if (!this.title.trim() || this.title.trim().length < 5) {
      this.error = 'Issue title must be at least 5 characters long.';
      return;
    }
    if (!this.description.trim() || this.description.trim().length < 10) {
      this.error = 'Issue description must be at least 10 characters long.';
      return;
    }
    if (!this.estimatedTime || this.estimatedTime <= 0) {
      this.error = 'Estimated time must be greater than 0 hours.';
      return;
    }
    if (!this.dueDate) {
      this.error = 'Due date is required.';
      return;
    }
    if (new Date(this.dueDate) <= new Date()) {
      this.error = 'Due date must be in the future.';
      return;
    }
    if (!this.assignedTo) {
      this.error = 'Please assign this issue to a user.';
      return;
    }

    this.loading = true;

    try {
      const newIssue = this.issueService.createIssue({
        title: this.title.trim(),
        description: this.description.trim(),
        estimatedTime: this.estimatedTime,
        completedTime: 0,
        dueDate: this.dueDate,
        assignedTo: this.assignedTo
      });

      this.success = true;
      this.resetForm();

      setTimeout(() => {
        this.router.navigate(['/issue', newIssue.id]);
      }, 1500);
    } catch (err: any) {
      this.error = err.message || 'Failed to create issue. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.estimatedTime = null;
    this.dueDate = null;
    this.assignedTo = this.currentUser?.id || '';
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }

  getUserName(userId: string): string {
    const user = this.allUsers.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }
}
