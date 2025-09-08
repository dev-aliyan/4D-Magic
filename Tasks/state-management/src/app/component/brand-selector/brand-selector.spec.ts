import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSelector } from './brand-selector';

describe('BrandSelector', () => {
  let component: BrandSelector;
  let fixture: ComponentFixture<BrandSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
