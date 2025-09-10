import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../models/brand';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  @Input() items: Item [] = [];
  @Output() addToCart = new EventEmitter<Item>();
}
