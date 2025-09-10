import { Component } from '@angular/core';
import { BrandStoreService } from '../../../services/brand-store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-brand-shop',
  templateUrl: './brand-shop.component.html',
  styleUrl: './brand-shop.component.css'
})
export class BrandShopComponent {

  constructor(public store: BrandStoreService , private router: Router) {}

}
