import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductService } from '../../core/services/products.service';

@Component({
  selector: 'app-sale-products',
  templateUrl: './sale-products.page.html',
  imports: [IonicModule, CommonModule]
})
export class SaleProductsPage {
  public productService = inject(ProductService);
}
