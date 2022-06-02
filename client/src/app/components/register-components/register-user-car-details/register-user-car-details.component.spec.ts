import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserCarDetailsComponent } from './register-user-car-details.component';

describe('RegisterUserCarDetailsComponent', () => {
  let component: RegisterUserCarDetailsComponent;
  let fixture: ComponentFixture<RegisterUserCarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserCarDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
