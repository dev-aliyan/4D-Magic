import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Brand, Item } from '../models/brand';

@Injectable({ providedIn: 'root' })
export class BrandStoreService {
  // Static brands
  brands: Brand[] = [
    { id: 'A', name: 'Brand A' },
    { id: 'B', name: 'Brand B' },
    { id: 'C', name: 'Brand C' }
  ];

  // Mock items per brand
  private itemsByBrand: Record<string, Item[]> = {
    A: [
      { id: 'A1', name: 'Item A1', brandId: 'A', price: 100 },
      { id: 'A2', name: 'Item A2', brandId: 'A', price: 120 },
      { id: 'A3', name: 'Item A3', brandId: 'A', price: 150 },
      { id: 'A4', name: 'Item A4', brandId: 'A', price: 180 },
      { id: 'A5', name: 'Item A5', brandId: 'A', price: 200 },
    ],
    B: [
      { id: 'B1', name: 'Item B1', brandId: 'B', price: 130 },
      { id: 'B2', name: 'Item B2', brandId: 'B', price: 160 },
      { id: 'B3', name: 'Item B3', brandId: 'B', price: 190 },
      { id: 'B4', name: 'Item B4', brandId: 'B', price: 210 },
      { id: 'B5', name: 'Item B5', brandId: 'B', price: 250 },
    ],
    C: [
      { id: 'C1', name: 'Item C1', brandId: 'C', price: 140 },
      { id: 'C2', name: 'Item C2', brandId: 'C', price: 170 },
      { id: 'C3', name: 'Item C3', brandId: 'C', price: 200 },
      { id: 'C4', name: 'Item C4', brandId: 'C', price: 230 },
      { id: 'C5', name: 'Item C5', brandId: 'C', price: 260 },
    ],
  };

  // State subjects
  private selectedBrandId$ = new BehaviorSubject<string>('A');

  private cartSubject = new BehaviorSubject<Item[]>([]);
  private waitingSubject = new BehaviorSubject<Item[]>([]);
  private ordersSubject = new BehaviorSubject<Item[]>([]);

  // Exposed Observables
  itemsForSelectedBrand$ = this.selectedBrandId$.pipe(
    map(id => this.itemsByBrand[id] ?? [])
  );

  cart$ = this.cartSubject.asObservable();
  waiting$ = this.waitingSubject.asObservable();
  orders$ = this.ordersSubject.asObservable();

  // State change methods
  selectBrand(id: string) {
    this.selectedBrandId$.next(id);
  }

  addToCart(item: Item) {
    this.cartSubject.next([...this.cartSubject.value, item]);
  }

  moveCartItemToOrders(item: Item) {
    this.cartSubject.next(this.cartSubject.value.filter(i => i.id !== item.id));
    this.ordersSubject.next([...this.ordersSubject.value, item]);
  }

  moveCartItemToWaiting(item: Item) {
    this.cartSubject.next(this.cartSubject.value.filter(i => i.id !== item.id));
    this.waitingSubject.next([...this.waitingSubject.value, item]);
  }

  moveWaitingItemToCart(item: Item) {
    this.waitingSubject.next(this.waitingSubject.value.filter(i => i.id !== item.id));
    this.cartSubject.next([...this.cartSubject.value, item]);
  }
}
