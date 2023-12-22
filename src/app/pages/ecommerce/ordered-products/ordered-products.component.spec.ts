import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedProductsComponent } from './ordered-products.component';

describe('OrderedProductsComponent', () => {
  let component: OrderedProductsComponent;
  let fixture: ComponentFixture<OrderedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderedProductsComponent]
    });
    fixture = TestBed.createComponent(OrderedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
