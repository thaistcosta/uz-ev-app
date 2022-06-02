import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserCarListComponent } from './register-user-car-list.component';

describe('RegisterUserCarListComponent', () => {
  let component: RegisterUserCarListComponent;
  let fixture: ComponentFixture<RegisterUserCarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserCarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
