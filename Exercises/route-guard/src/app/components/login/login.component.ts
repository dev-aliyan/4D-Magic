// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  triggerLogin() {
    this.authService.login();
    
    // Get the return URL from query parameters or default to '/dashboard'
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    
    this.router.navigate([returnUrl]);
  }
}