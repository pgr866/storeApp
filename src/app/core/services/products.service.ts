import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData, query, where, addDoc, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';
import { switchMap, of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private productsCollection = collection(this.firestore, 'products');
  private readonly vendorId = '8IFFezQPiohMB3yuKWwYfzyjBXE3';
  private _currentProduct = signal<Product | null>(null);
  public currentProduct = this._currentProduct.asReadonly();

  private products$ = this.authService.user$.pipe(
    switchMap(user => {
      if (user) {
        const q = query(this.productsCollection, where('userId', '==', user.uid));
        return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
      } else {
        return of([]);
      }
    })
  );

  public products = toSignal(this.products$, { initialValue: [] });

  private saleProducts$ = of(this.vendorId).pipe(
    switchMap(uid => {
      if (uid) {
        const q = query(this.productsCollection, where('userId', '==', uid));
        return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
      } else {
        return of([]);
      }
    })
  );

  public saleProducts = toSignal(this.saleProducts$, { initialValue: [] });

  async addProduct(product: Product) {
    const uid = this.authService.getUID();
    if (!uid) throw new Error('No hay usuario autenticado');
    return addDoc(this.productsCollection, {
      ...product,
      userId: uid
    });
  }

  async getProductById(id: string) {
    try {
      const productRef = doc(this.firestore, `products/${id}`);
      const snapshot = await getDoc(productRef);
      if (snapshot.exists()) {
        this._currentProduct.set({ id: snapshot.id, ...snapshot.data() } as Product);
      } else {
        this._currentProduct.set(null);
      }
    } catch (error) {
      this._currentProduct.set(null);
    }
  }

  async deleteProduct(id: string) {
    try {
      const productRef = doc(this.firestore, `products/${id}`);
      await deleteDoc(productRef);
    } catch (error) {
      throw new Error('No se pudo eliminar el artículo');
    }
  }
}
