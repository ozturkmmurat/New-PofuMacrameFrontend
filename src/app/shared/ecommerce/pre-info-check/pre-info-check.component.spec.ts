import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreInfoCheckComponent } from './pre-info-check.component';

describe('PreInfoCheckComponent', () => {
  let component: PreInfoCheckComponent;
  let fixture: ComponentFixture<PreInfoCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreInfoCheckComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PreInfoCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
