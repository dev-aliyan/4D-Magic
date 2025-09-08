import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Item } from '../../models/brand';

@Component({
  selector: 'app-waiting-list',
  standalone: false,
  templateUrl: './waiting-list.html',
  styleUrl: './waiting-list.css'
})
export class WaitingList {
  @Input() waiting: Item[] = [];
  @Output() moveToCart = new EventEmitter<Item>();
}
