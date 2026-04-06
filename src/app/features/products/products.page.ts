import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/products.service';
import { add, logOutOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  imports: [IonicModule, CommonModule, RouterLink]
})
export class ProductsPage {
  public productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    addIcons({ add, logOutOutline });
  }

  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
