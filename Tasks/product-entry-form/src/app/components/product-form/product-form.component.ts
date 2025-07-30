import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['',[Validators.required, Validators.minLength(3)]],
      sku: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('Product Data:', productData);
      alert('Product submitted successfully!');
      this.productForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
