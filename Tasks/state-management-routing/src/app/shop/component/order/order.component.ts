import { Component } from '@angular/core';
import { BrandStoreService } from '../../../services/brand-store.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  constructor(public store: BrandStoreService) {}
}