import { AuthStoreService } from './../core/state/auth-store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

  user = this.authStore.currentUser

  constructor(private authStore: AuthStoreService) {}

  ngOnInit(): void {}

  logout() {
    this.authStore.setUser(null)
  }

}
