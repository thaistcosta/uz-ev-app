import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-register-user-car-details',
  templateUrl: './register-user-car-details.component.html',
  styleUrls: ['./register-user-car-details.component.css']
})
export class RegisterUserCarDetailsComponent implements OnInit {

  userCar!: any;
  @Input() car!: any;
  @Output() selectedCar: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  select(car: any) {
    this.userCar = car;
    this.selectedCar.emit(this.userCar);
  }

}
