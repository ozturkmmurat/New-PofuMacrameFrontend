import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryImagesComponent } from './category-images.component';

describe('CategoryImagesComponent', () => {
  let component: CategoryImagesComponent;
  let fixture: ComponentFixture<CategoryImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryImagesComponent]
    });
    fixture = TestBed.createComponent(CategoryImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
