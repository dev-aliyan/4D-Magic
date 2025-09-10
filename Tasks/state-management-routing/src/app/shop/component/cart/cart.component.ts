import { Component } from '@angular/core';
import { BrandStoreService } from '../../../services/brand-store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(public store: BrandStoreService) {}
}