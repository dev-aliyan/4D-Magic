import { Component, Input } from '@angular/core';
import { Item } from '../../../models/brand';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  @Input() orders: Item[] = [];
}
