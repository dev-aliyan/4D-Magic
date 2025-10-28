// dashboard-layout.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge: number | null;
}

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  sidebarCollapsed = false;
  mobileMenuOpen = false;
  private sub?: Subscription;

  menuItems: MenuItem[] = [
    { label: 'Dashboard',  icon: 'pi pi-home',        route: '/dashboard',               badge: null },
    { label: 'Issues',     icon: 'pi pi-list',        route: '/dashboard/issues',        badge: null },
    { label: 'Create Issue', icon: 'pi pi-plus-circle', route: '/dashboard/issue/create', badge: null },
    // { label: 'My Issues', icon: 'pi pi-user',       route: '/dashboard/my-issues',     badge: null },
  ];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Let the AuthGuard handle access. Just reflect the user in the header.
    this.sub = this.userService.currentUser$.subscribe(u => {
      this.currentUser = u;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + '/');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    return `${this.currentUser.firstName.charAt(0)}${this.currentUser.lastName.charAt(0)}`.toUpperCase();
    }

  getUserFullName(): string {
    if (!this.currentUser) return 'User';
    return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.mobileMenuOpen = false;
  }
}
