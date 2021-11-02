import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetToCartSelectComponent } from './set-to-cart-select.component';

describe('SetToCartSelectComponent', () => {
  let component: SetToCartSelectComponent;
  let fixture: ComponentFixture<SetToCartSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetToCartSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetToCartSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
