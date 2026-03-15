import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DistanceSalesCheckComponent } from './distance-sales-check.component';

describe('DistanceSalesCheckComponent', () => {
  let component: DistanceSalesCheckComponent;
  let fixture: ComponentFixture<DistanceSalesCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistanceSalesCheckComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DistanceSalesCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
