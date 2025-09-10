import { Component, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { PaginatorState } from 'primeng/paginator';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  products = signal<any[]>([]);       // all products
  pagedProducts = signal<any[]>([]);  // only visible products for current page
  first: number = 0;
  rows: number = 5;  

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products.set(this.productService.getProducts());
    this.updatePagedProducts();
  }

  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return null;
    }
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
    this.updatePagedProducts();
  }

  private updatePagedProducts() {
    const allProducts = this.products();
    this.pagedProducts.set(
      allProducts.slice(this.first, this.first + this.rows)
    );
  }

}
