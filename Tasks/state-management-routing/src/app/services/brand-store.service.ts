import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Brand, Item } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
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
      { "id": "A1", "name": "Item A1", "brandId": "A", "price": 100 },
      { "id": "A2", "name": "Item A2", "brandId": "A", "price": 120 },
      { "id": "A3", "name": "Item A3", "brandId": "A", "price": 150 },
      { "id": "A4", "name": "Item A4", "brandId": "A", "price": 180 },
      { "id": "A5", "name": "Item A5", "brandId": "A", "price": 200 },
      { "id": "A6", "name": "Item A6", "brandId": "A", "price": 220 },
      { "id": "A7", "name": "Item A7", "brandId": "A", "price": 240 },
      { "id": "A8", "name": "Item A8", "brandId": "A", "price": 260 },
      { "id": "A9", "name": "Item A9", "brandId": "A", "price": 280 },
      { "id": "A10", "name": "Item A10", "brandId": "A", "price": 300 },
      { "id": "A11", "name": "Item A11", "brandId": "A", "price": 320 },
      { "id": "A12", "name": "Item A12", "brandId": "A", "price": 340 },
      { "id": "A13", "name": "Item A13", "brandId": "A", "price": 360 },
      { "id": "A14", "name": "Item A14", "brandId": "A", "price": 380 },
      { "id": "A15", "name": "Item A15", "brandId": "A", "price": 400 },
      { "id": "A16", "name": "Item A16", "brandId": "A", "price": 420 },
      { "id": "A17", "name": "Item A17", "brandId": "A", "price": 440 },
      { "id": "A18", "name": "Item A18", "brandId": "A", "price": 460 },
      { "id": "A19", "name": "Item A19", "brandId": "A", "price": 480 },
      { "id": "A20", "name": "Item A20", "brandId": "A", "price": 500 }
    ],
    B: [
      { "id": "B1", "name": "Item B1", "brandId": "B", "price": 130 },
      { "id": "B2", "name": "Item B2", "brandId": "B", "price": 160 },
      { "id": "B3", "name": "Item B3", "brandId": "B", "price": 190 },
      { "id": "B4", "name": "Item B4", "brandId": "B", "price": 210 },
      { "id": "B5", "name": "Item B5", "brandId": "B", "price": 250 },
      { "id": "B6", "name": "Item B6", "brandId": "B", "price": 270 },
      { "id": "B7", "name": "Item B7", "brandId": "B", "price": 290 },
      { "id": "B8", "name": "Item B8", "brandId": "B", "price": 310 },
      { "id": "B9", "name": "Item B9", "brandId": "B", "price": 330 },
      { "id": "B10", "name": "Item B10", "brandId": "B", "price": 350 },
      { "id": "B11", "name": "Item B11", "brandId": "B", "price": 370 },
      { "id": "B12", "name": "Item B12", "brandId": "B", "price": 390 },
      { "id": "B13", "name": "Item B13", "brandId": "B", "price": 410 },
      { "id": "B14", "name": "Item B14", "brandId": "B", "price": 430 },
      { "id": "B15", "name": "Item B15", "brandId": "B", "price": 450 },
      { "id": "B16", "name": "Item B16", "brandId": "B", "price": 470 },
      { "id": "B17", "name": "Item B17", "brandId": "B", "price": 490 },
      { "id": "B18", "name": "Item B18", "brandId": "B", "price": 510 },
      { "id": "B19", "name": "Item B19", "brandId": "B", "price": 530 },
      { "id": "B20", "name": "Item B20", "brandId": "B", "price": 550 }
    ],
    C: [
      { "id": "C1", "name": "Item C1", "brandId": "C", "price": 140 },
      { "id": "C2", "name": "Item C2", "brandId": "C", "price": 170 },
      { "id": "C3", "name": "Item C3", "brandId": "C", "price": 200 },
      { "id": "C4", "name": "Item C4", "brandId": "C", "price": 230 },
      { "id": "C5", "name": "Item C5", "brandId": "C", "price": 260 },
      { "id": "C6", "name": "Item C6", "brandId": "C", "price": 290 },
      { "id": "C7", "name": "Item C7", "brandId": "C", "price": 320 },
      { "id": "C8", "name": "Item C8", "brandId": "C", "price": 350 },
      { "id": "C9", "name": "Item C9", "brandId": "C", "price": 380 },
      { "id": "C10", "name": "Item C10", "brandId": "C", "price": 410 },
      { "id": "C11", "name": "Item C11", "brandId": "C", "price": 440 },
      { "id": "C12", "name": "Item C12", "brandId": "C", "price": 470 },
      { "id": "C13", "name": "Item C13", "brandId": "C", "price": 500 },
      { "id": "C14", "name": "Item C14", "brandId": "C", "price": 530 },
      { "id": "C15", "name": "Item C15", "brandId": "C", "price": 560 },
      { "id": "C16", "name": "Item C16", "brandId": "C", "price": 590 },
      { "id": "C17", "name": "Item C17", "brandId": "C", "price": 620 },
      { "id": "C18", "name": "Item C18", "brandId": "C", "price": 650 },
      { "id": "C19", "name": "Item C19", "brandId": "C", "price": 680 },
      { "id": "C20", "name": "Item C20", "brandId": "C", "price": 710 }
    ]
  };

  //local storage key for cart persistence
  private readonly storageKey = 'brandState_v1';


  // ----- reactive state pointers -----
  // currently selected brand id (BehaviorSubject so new subscribers get current value)
  private selectedBrandId$ = new BehaviorSubject<string>(this.brands[0]?.id ?? 'A');

  // internal per-brand state object (cart/waiting/orders) persisted to localStorage

  private stateByBrand: Record<string, { cart: Item[]; waiting : Item[]; orders: Item[] }> = {};

  // subjects that represent the current brand's view lists (these are pushed when selection or mutation happens)

  private cartSubject = new BehaviorSubject<Item[]>([]);
  private waitingSubject = new BehaviorSubject<Item[]>([]);
  private ordersSubject = new BehaviorSubject<Item[]>([]);

  // ----- public observables (templates/components subscribe to these) -----
  // expose selectedBrand as observable (read-only to outside)
  selectedBrandId = this.selectedBrandId$.asObservable();


  // --- Exposed observables ---
  itemsForSelectedBrand$ = combineLatest([
    this.selectedBrandId$,
    this.cartSubject,
    this.waitingSubject,
    this.ordersSubject
  ]).pipe(
    map(([brandId, cart, waiting, orders]) => {
      // load items for the selected brand
      const allItems = this.itemsByBrand[brandId] ?? [];
      return allItems.filter(
        item => 
          !cart.some(c => c.id === item.id) &&
          !waiting.some(w => w.id === item.id) &&
          !orders.some(o => o.id === item.id)
      );
    })
  );

  cart$ = this.cartSubject.asObservable();
  waiting$ = this.waitingSubject.asObservable();
  orders$ = this.ordersSubject.asObservable();

  constructor() {
    // initialize stateByBrand either from localStorage or with empty lists per brand
    const storedState = localStorage.getItem(this.storageKey);
    this.stateByBrand = storedState ? JSON.parse(storedState) : {};
    this.brands.forEach(brand => {
      if (!this.stateByBrand[brand.id]) {
        this.stateByBrand[brand.id] = { cart: [], waiting: [], orders: [] };
      }
    });

    const initialBrandId = this.selectedBrandId$.value;
    this.loadBrandStateIntoSubjects(initialBrandId);
  }

  // ---------- helper: persist the entire stateByBrand to localStorage ----------
  private persistState(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({ stateByBrand: this.stateByBrand }));
    } catch (error) {
      // ignore storage errors silently (or log)
      console.error('Error persisting state to localStorage:', error);
    }
  }

  private loadBrandStateIntoSubjects(brandId: string): void {
    const state = this.stateByBrand[brandId] || { cart: [], waiting: [], orders: [] };
    this.cartSubject.next([...state.cart]);
    this.waitingSubject.next([...state.waiting]);
    this.ordersSubject.next([...state.orders]);
  }

  // ---------- public API methods ----------
  // --- State change methods ---
  selectBrand(id: string) {
    if(!this.itemsByBrand[id]) {
      console.warn(`Brand with id ${id} does not exist.`);
      return;
    }
    // change the selected brand and load its state
    this.selectedBrandId$.next(id);
    this.loadBrandStateIntoSubjects(id);
  }

  addToCart(item: Item) : void {
    const brandId = item.brandId;
    const state = this.stateByBrand[brandId];
    if (state.cart.some(i => i.id === item.id) || state.waiting.some(i => i.id === item.id) || state.orders.some(i => i.id === item.id)) {
      // item already exists in one of the lists, ignore
      return;
    }
    state.cart = [...state.cart, item];
    this.persistState();
    if (this.selectedBrandId$.value === brandId) {
      this.cartSubject.next([...state.cart]);
    }
  }

  moveCartItemToOrders(item: Item): void {
    const brandId = item.brandId;
    const state = this.stateByBrand[brandId];
    state.cart = state.cart.filter(i => i.id !== item.id);
    if (!state.orders.some(i => i.id === item.id)) {
      state.orders = [...state.orders, item];
    }
    this.persistState();
    if (this.selectedBrandId$.value === brandId) {
      this.cartSubject.next([...state.cart]);
      this.ordersSubject.next([...state.orders]);
    }
  }

  moveCartItemToWaiting(item: Item): void {
    const brandId = item.brandId;
    const state = this.stateByBrand[brandId];
    state.cart = state.cart.filter(i => i.id !== item.id);
    if (!state.waiting.some(i => i.id === item.id)) {
      state.waiting = [...state.waiting, item];
    }
    this.persistState();
    if (this.selectedBrandId$.value === brandId) {
      this.cartSubject.next([...state.cart]);
      this.waitingSubject.next([...state.waiting]);
    }
  }

  moveWaitingItemToCart(item: Item): void {
    const brandId = item.brandId;
    const state = this.stateByBrand[brandId];
    state.waiting = state.waiting.filter(i => i.id !== item.id);
    if (!state.cart.some(i => i.id === item.id)) {
      state.cart = [...state.cart, item];
    }
    this.persistState();
    if (this.selectedBrandId$.value === brandId) {
      this.waitingSubject.next([...state.waiting]);
      this.cartSubject.next([...state.cart]);
    }
  }
}
