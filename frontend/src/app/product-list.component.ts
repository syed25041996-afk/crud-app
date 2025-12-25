import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products: Product[] = [];
  loading = false;
  error: string | null = null;

  // Modal properties
  showModal = false;
  isEdit = false;
  selectedProduct: Product | null = null;
  productForm: FormGroup;
  formLoading = false;
  formError: string | null = null;

  // Delete modal properties
  showDeleteModal = false;
  productToDelete: Product | null = null;
  deleteLoading = false;

  constructor() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)])
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onEdit(product: Product): void {
    this.isEdit = true;
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    this.showModal = true;
    this.formError = null;
  }

  onDelete(product: Product): void {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.productToDelete) {
      this.deleteLoading = true;
      this.productService.deleteProduct(this.productToDelete.id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== this.productToDelete!.id);
          this.showDeleteModal = false;
          this.productToDelete = null;
          this.deleteLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to delete product';
          this.showDeleteModal = false;
          this.productToDelete = null;
          this.deleteLoading = false;
          console.error(err);
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  onAddNew(): void {
    this.isEdit = false;
    this.selectedProduct = null;
    this.productForm.reset();
    this.showModal = true;
    this.formError = null;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.formLoading = true;
      this.formError = null;
      const productData = this.productForm.value;
      const operation = this.isEdit
        ? this.productService.updateProduct(this.selectedProduct!.id, { ...productData, id: this.selectedProduct!.id })
        : this.productService.createProduct(productData);

      operation.subscribe({
        next: () => {
          this.showModal = false;
          this.loadProducts();
        },
        error: (err) => {
          this.formError = 'Failed to save product';
          this.formLoading = false;
          console.error(err);
        }
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}