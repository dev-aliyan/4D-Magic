import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QouteHeaderComponent } from './qoute-header.component';

describe('QouteHeaderComponent', () => {
  let component: QouteHeaderComponent;
  let fixture: ComponentFixture<QouteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QouteHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QouteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
