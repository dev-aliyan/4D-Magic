import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private authService : AuthService, 
    private route : ActivatedRoute , 
    private router: Router
  ) {}

  triggerLogout () {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
