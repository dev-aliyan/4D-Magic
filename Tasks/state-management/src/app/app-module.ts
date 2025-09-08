import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrandShopComponent } from './component/brand-shop/brand-shop';
import { BrandSelector } from './component/brand-selector/brand-selector';
import { ItemLis } from './component/item-lis/item-lis';
import { Cart } from './component/cart/cart';
import { WaitingList } from './component/waiting-list/waiting-list';
import { Orders } from './component/orders/orders';

@NgModule({
  declarations: [
    App,
    BrandShopComponent,
    BrandSelector,
    ItemLis,
    Cart,
    WaitingList,
    Orders,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
