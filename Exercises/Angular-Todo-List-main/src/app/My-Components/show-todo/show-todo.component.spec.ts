import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTodoComponent } from './show-todo.component';

describe('ShowTodoComponent', () => {
  let component: ShowTodoComponent;
  let fixture: ComponentFixture<ShowTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
