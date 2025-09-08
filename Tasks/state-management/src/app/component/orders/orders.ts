import { Component, Input } from '@angular/core';
import { Item } from '../../models/brand';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders {
  @Input() orders: Item[] = [];
}
