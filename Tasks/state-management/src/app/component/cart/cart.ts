import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/brand';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  @Input() cart: Item[] = [];
  @Output() requestBooking = new EventEmitter<Item>();
  @Output() addToWaiting = new EventEmitter<Item>();
}
