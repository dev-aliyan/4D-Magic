import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandShop } from './brand-shop';

describe('BrandShop', () => {
  let component: BrandShop;
  let fixture: ComponentFixture<BrandShop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandShop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandShop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
