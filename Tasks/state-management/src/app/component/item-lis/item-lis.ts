import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/brand';

@Component({
  selector: 'app-item-lis',
  standalone: false,
  templateUrl: './item-lis.html',
  styleUrl: './item-lis.css'
})
export class ItemLis {
  @Input() items: Item [] = [];
  @Output() addToCart = new EventEmitter<Item>();
}
