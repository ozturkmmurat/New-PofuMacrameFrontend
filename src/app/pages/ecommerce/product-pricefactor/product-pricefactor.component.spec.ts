import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPricefactorComponent } from './product-pricefactor.component';

describe('ProductPricefactorComponent', () => {
  let component: ProductPricefactorComponent;
  let fixture: ComponentFixture<ProductPricefactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPricefactorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPricefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
