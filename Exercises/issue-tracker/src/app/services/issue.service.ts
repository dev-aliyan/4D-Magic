import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivityLog, Change, Issue } from '../models/issue';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issues: Issue[] = [];
  private activityLogs: ActivityLog[] = [];

  
  private issuesSubject = new BehaviorSubject<Issue[]>([]);
  issues$ = this.issuesSubject.asObservable();

  constructor(private authService: AuthService) {
    this.loadIssues();
  }

  private loadIssues() {
    const stored = localStorage.getItem('issues');
    if (stored) {
      this.issues = JSON.parse(stored);
    } else {
      this.issues = [];
      localStorage.setItem('issues', JSON.stringify(this.issues));
    }
    this.issuesSubject.next(this.issues);
  }

  private loadActivityLogs() {
    const stored = localStorage.getItem('activityLogs');
    if (stored) {
      this.activityLogs = JSON.parse(stored);
    } else {
      this.activityLogs = [];
      localStorage.setItem('activityLogs', JSON.stringify(this.activityLogs));
    }
  }


  private saveIssues() {
    localStorage.setItem('issues', JSON.stringify(this.issues));
    this.issuesSubject.next(this.issues);
  }

  private saveActivityLogs() {
    localStorage.setItem('activityLogs', JSON.stringify(this.activityLogs));
  }


  private generateIssueId(): string {
    const maxId = this.issues.reduce((max, issue) => {
      const num = parseInt(issue.id.split('-')[1]);
      return num > max ? num : max;
    }, 0);
    return `ISS-${String(maxId + 1).padStart(3, '0')}`;
  }

  private generateLogId(): string {
    const maxId = this.activityLogs.reduce((max, log) => {
      const num = parseInt(log.id.split('-')[1]);
      return num > max ? num : max;
    }, 0);
    return `LOG-${String(maxId + 1).padStart(3, '0')}`;
  }

  private logActivity(
    issueId: string,
    action: 'created' | 'updated' | 'deleted' | 'state_changed',
    changes: Change[] = []
  ) {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const log: ActivityLog = {
      id: this.generateLogId(),
      issueId,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      action,
      changes,
      timestamp: new Date()
    };

    this.activityLogs.push(log);
    this.saveActivityLogs();
  }


  createIssue(issueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'state'>): Issue {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User must be logged in to create an issue');
    }

    const newIssue: Issue = {
      ...issueData,
      id: this.generateIssueId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: currentUser.id,
      state: 'new',
      dueDate: new Date(issueData.dueDate),
      title: issueData.title,
      description: issueData.description,
      estimatedTime: issueData.estimatedTime,
      completedTime: issueData.completedTime,
      assignedTo: issueData.assignedTo
    };

    this.issues.push(newIssue);
    this.saveIssues();
    this.logActivity(newIssue.id, 'created');

    return newIssue;
  }


  getAllIssues(): Issue[] {
    return this.issues;
  }

  getIssueById(id: string): Issue | undefined {
    return this.issues.find(issue => issue.id === id);
  }

  getIssuesByAssignee(userId: string): Issue[] {
    return this.issues.filter(issue => issue.assignedTo === userId);
  }

  getIssuesByCreator(userId: string): Issue[] {
    return this.issues.filter(issue => issue.createdBy === userId);
  }

  updateIssue(id: string, updates: Partial<Issue>): Issue {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User must be logged in to update an issue');
    }

    const index = this.issues.findIndex(issue => issue.id === id);
    if (index === -1) {
      throw new Error('Issue not found');
    }

    const oldIssue = this.issues[index];
    
    if (currentUser.role !== 'admin' && oldIssue.createdBy !== currentUser.id) {
      throw new Error('You do not have permission to update this issue');
    }

    const changes: Change[] = [];
    Object.keys(updates).forEach(key => {
      const oldValue = (oldIssue as any)[key];
      const newValue = (updates as any)[key];
      if (oldValue !== newValue) {
        changes.push({ field: key, oldValue, newValue });
      }
    });

    const updatedIssue = {
      ...oldIssue,
      ...updates,
      updatedAt: new Date()
    };

    this.issues[index] = updatedIssue;
    this.saveIssues();

    if (changes.length > 0) {
      const action = changes.some(c => c.field === 'state') ? 'state_changed' : 'updated';
      this.logActivity(id, action, changes);
    }

    return updatedIssue;
  }

  deleteIssue(id: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User must be logged in to delete an issue');
    }

    const issue = this.issues.find(i => i.id === id);
    if (!issue) {
      throw new Error('Issue not found');
    }

    if (currentUser.role !== 'admin' && issue.createdBy !== currentUser.id) {
      throw new Error('You do not have permission to delete this issue');
    }

    this.issues = this.issues.filter(i => i.id !== id);
    this.saveIssues();
    this.logActivity(id, 'deleted');
  }

  assignIssue(issueId: string, userId: string): Issue {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User must be logged in');
    }

    if (currentUser.role !== 'admin' && userId !== currentUser.id) {
      throw new Error('Only admins can assign issues to other users');
    }

    return this.updateIssue(issueId, { assignedTo: userId });
  }

  getActivityLogs(issueId: string): ActivityLog[] {
    return this.activityLogs
      .filter(log => log.issueId === issueId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }


  searchIssues(searchTerm: string): Issue[] {
    const term = searchTerm.toLowerCase();
    return this.issues.filter(issue => {
      const assignedUser = this.authService.getAllUsers().find(u => u.id === issue.assignedTo);
      const assignedName = assignedUser ? `${assignedUser.firstName} ${assignedUser.lastName}`.toLowerCase() : '';
      
      return (
        issue.title.toLowerCase().includes(term) ||
        issue.id.toLowerCase().includes(term) ||
        assignedName.includes(term)
      );
    });
  }

  calculateDelay(issue: Issue): number {
    return issue.completedTime - issue.estimatedTime;
  }

  isOverdue(issue: Issue): boolean {
    if (issue.state === 'completed') return false;
    return new Date(issue.dueDate) < new Date();
  }
}