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
      productName: ['',[Validators.required, Validators.minLength(3)]],
      sku: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
    })

    this.productForm.get('category')?.valueChanges.subscribe(category => {
      this.selectedCategory = category;
      console.log('Selected Category:', this.selectedCategory);
      this.updateCategoryFields(category);
    });
  }

  updateCategoryFields(category: string) {
    

    if (category === 'shoes') {
      this.productForm.addControl('shoeSize', this.fb.control('', Validators.required));
    } else if (category === 'clothes') {
      this.productForm.addControl('clothesSize', this.fb.control('', Validators.required));
    }
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
