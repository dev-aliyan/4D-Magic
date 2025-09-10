import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../models/brand';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrl: './waiting-list.component.css'
})
export class WaitingListComponent {
  @Input() waiting: Item[] = [];
  @Output() moveToCart = new EventEmitter<Item>();
}
