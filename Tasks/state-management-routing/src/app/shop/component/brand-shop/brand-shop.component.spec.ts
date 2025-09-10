import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandShopComponent } from './brand-shop.component';

describe('BrandShopComponent', () => {
  let component: BrandShopComponent;
  let fixture: ComponentFixture<BrandShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
