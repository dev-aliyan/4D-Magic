import { Component } from '@angular/core';
import { BrandStoreService } from '../../../services/brand-store.service';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrl: './waiting-list.component.css'
})
export class WaitingListComponent {
  constructor(public store: BrandStoreService) {}
}