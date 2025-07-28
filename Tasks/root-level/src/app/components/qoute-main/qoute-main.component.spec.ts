import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QouteMainComponent } from './qoute-main.component';

describe('QouteMainComponent', () => {
  let component: QouteMainComponent;
  let fixture: ComponentFixture<QouteMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QouteMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QouteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
