import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../models/brand';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input() cart: Item[] = [];
  @Output() requestBooking = new EventEmitter<Item>();
  @Output() addToWaiting = new EventEmitter<Item>();
}
