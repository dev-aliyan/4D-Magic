// brand-shop.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable, takeUntil } from 'rxjs';
import { BrandStoreService } from '../../services/brand-store';
import { Brand, Item } from '../../models/brand';


@Component({
  selector: 'app-brand-shop',
  templateUrl: './brand-shop.html',
  styleUrls: ['./brand-shop.css'],
  standalone: false,
})

export class BrandShopComponent implements OnInit, OnDestroy {
  brands: Brand[] = [];
  brandControl!: FormControl<string>;

  items$!: Observable<Item[]>;
  cart$!: Observable<Item[]>;
  waiting$!: Observable<Item[]>;
  orders$!: Observable<Item[]>;

  private destroy$ = new Subject<void>();

  constructor(private store: BrandStoreService) {}

  ngOnInit(): void {
    this.brands = this.store.brands;

    // default selection = first brand
    const initialId = this.brands[0]?.id ?? 'A';
    this.brandControl = new FormControl<string>(initialId, { nonNullable: true });

    this.items$ = this.store.itemsForSelectedBrand$;
    this.cart$ = this.store.cart$;
    this.waiting$ = this.store.waiting$;
    this.orders$ = this.store.orders$;

    // update store when brand changes
    this.brandControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(id => {
      if (id) this.store.selectBrand(id);
    });

    this.store.selectBrand(this.brandControl.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // UI actions
  addToCart(item: Item) {
    this.store.addToCart(item);
  }

  requestBooking(item: Item) {
    this.store.moveCartItemToOrders(item);
  }

  addToWaiting(item: Item) {
    this.store.moveCartItemToWaiting(item);
  }

  moveWaitingToCart(item: Item) {
    this.store.moveWaitingItemToCart(item);
  }
}
