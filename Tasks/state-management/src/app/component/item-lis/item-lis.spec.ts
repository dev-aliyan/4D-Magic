import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLis } from './item-lis';

describe('ItemLis', () => {
  let component: ItemLis;
  let fixture: ComponentFixture<ItemLis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemLis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemLis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
