import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrandShopComponent } from './component/brand-shop/brand-shop.component';
import { BrandSelectorComponent } from './component/brand-selector/brand-selector.component';
import { ItemListComponent } from './component/item-list/item-list.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { WaitingListComponent } from './component/waiting-list/waiting-list.component';
import { NavbarComponent } from './component/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: BrandShopComponent }, 
  { path: 'item-list', component: ItemListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'waiting-list', component: WaitingListComponent }
];

@NgModule({
  declarations: [
    BrandShopComponent,
    BrandSelectorComponent,
    ItemListComponent,
    CartComponent,
    OrderComponent,
    WaitingListComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)   // ✅ Correct way to register child routes
  ]
})
export class ShopModule {}
