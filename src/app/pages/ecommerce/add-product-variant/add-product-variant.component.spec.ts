import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductVariantComponent } from './add-product-variant.component';

describe('AddProductVariantComponent', () => {
  let component: AddProductVariantComponent;
  let fixture: ComponentFixture<AddProductVariantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductVariantComponent]
    });
    fixture = TestBed.createComponent(AddProductVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
