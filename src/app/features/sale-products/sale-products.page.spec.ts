import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleProductsPage } from './sale-products.page';

describe('SaleProductsPage', () => {
  let component: SaleProductsPage;
  let fixture: ComponentFixture<SaleProductsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
