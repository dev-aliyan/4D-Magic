import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;
  selectedCategory: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      sku: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],

      shoeName: ['', Validators.required],
      shoeSize: ['', Validators.required],
      shoeColor: ['', Validators.required],

      clothesName: ['', Validators.required],
      clothesSize: ['', Validators.required],
      clothesColor: ['', Validators.required]
    });

    this.productForm.get('category')?.valueChanges.subscribe(category => {
      this.selectedCategory = category;
      console.log('Selected Category:', this.selectedCategory);
    });
  }


  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('Product Data:', productData);
      alert('Product submitted successfully!');
      this.productForm.reset();
      this.selectedCategory
    } else {
      console.log('Form is invalid');
    }
  }
}
