// brand-shop.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandStoreService } from '../../services/brand-store';
import { Brand, Item } from '../../models/brand';


@Component({
  selector: 'app-brand-shop',
  templateUrl: './brand-shop.html',
  styleUrls: ['./brand-shop.css'],
  standalone: false,
})

export class BrandShopComponent {

  constructor(public store: BrandStoreService) {}


}
