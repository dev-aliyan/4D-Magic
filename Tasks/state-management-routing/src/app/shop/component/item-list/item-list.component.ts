import { Component } from '@angular/core';
import { BrandStoreService } from '../../../services/brand-store.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  constructor(public store: BrandStoreService) {}
}