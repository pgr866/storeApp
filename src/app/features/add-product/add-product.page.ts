import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.page.html',
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class AddProductPage {
  private productService = inject(ProductService);
  private router = inject(Router);
  private loadingController = inject(LoadingController);
  private toastController = inject(ToastController);

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });

  async addProduct() {
    if (this.productForm.invalid) return;
    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();
    try {
      // Enviamos el objeto tal cual sale del formulario
      await this.productService.addProduct(this.productForm.value as any);
      this.showToast('Producto añadido');
      this.router.navigate(['/products']);
    } catch (error: any) {
      this.showToast('Error al guardar: ' + error.message, 'danger');
    } finally {
      loading.dismiss();
    }
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
