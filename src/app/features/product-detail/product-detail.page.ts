import { Component, OnInit, inject, Input } from '@angular/core';
import { ProductService } from '../../core/services/products.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: 'product-detail.page.html',
  styleUrls: ['product-detail.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class ProductDetailPage implements OnInit {
  @Input() id!: string;
  public productService = inject(ProductService);
  private alertCtrl = inject(AlertController);
  private toastController = inject(ToastController);
  private navCtrl = inject(NavController);

  constructor() {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    if (this.id) {
      this.productService.getProductById(this.id);
      console.log(this.productService.currentProduct());
    }
  }

  async confirmDelete() {
    const product = this.productService.currentProduct();
    if (!product?.id) return;

    const alert = await this.alertCtrl.create({
      header: '¿Eliminar producto?',
      message: `¿Estás seguro de que quieres eliminar "${product.name}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            try {
              await this.productService.deleteProduct(product.id);
              await this.showToast('Producto eliminado correctamente');
              this.navCtrl.back();
            } catch (error: any) {
              await this.showToast(`Error al eliminar producto: ${error.message}`, 'danger');
            }
          }
        }
      ]
    });
    await alert.present();
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
