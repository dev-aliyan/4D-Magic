import { Router } from '@angular/router';
import { AuthStoreService } from './../core/state/auth-store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

  user = this.authStore.currentUser

  constructor(private authStore: AuthStoreService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authStore.setUser(null)
    this.router.navigate(['/login'])
  }

}
