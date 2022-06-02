import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiClientService } from 'src/app/service/api-client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StoreService } from 'src/app/service/store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user-car-list',
  templateUrl: './register-user-car-list.component.html',
  styleUrls: ['./register-user-car-list.component.css']
})
export class RegisterUserCarListComponent implements OnInit {

  make!: string;
  allCars: any[] = [];
  makeList: any[] = [];
  versionList: any[] = [];
  filterCarList: any[] = [];
  makeForm!: FormGroup;
  versionForm!: FormGroup;

  constructor(private api: ApiClientService, private apollo: Apollo, 
    private formBuilder: FormBuilder, private http: HttpClient, 
    private store: StoreService, private _router: Router) { }

  ngOnInit(): void {
    this.getCarList();
    // this.mockdata()
    this.makeFormBuilder();

  }

  mockdata() {
    this.http.get('https://c4d646bc-ccb1-478e-a6fa-e4347e0a66b9.mock.pstmn.io/get').subscribe((query: any) => {
      query.data.carList.forEach((el: any) => {
        this.allCars.push(el)
      if (!this.makeList.includes(el.naming.make)){
        this.makeList.push(el.naming.make)
      }
    })
  });
  }

  makeFormBuilder(): void {
    this.makeForm = this.formBuilder.group({
      make: [null]
    })
    // listening for the Make selection to render the cars
    this.makeForm.get('make')?.valueChanges.subscribe(make => this.onSelectMake(make))
  }

  versionFormBuilder(): void {
    this.versionForm = this.formBuilder.group({
      version: [null]
    })
    // listening for the Make selection to render the cars
    this.versionForm.get('version')?.valueChanges.subscribe(version => this.onSelectVersion(version))
  }


  getCarList(): void {
    this.api.carList()
      .subscribe((query: any) => {
        query.data.carList.forEach((el: any) => {
          this.allCars.push(el)
        if (!this.makeList.includes(el.naming.make)){
          this.makeList.push(el.naming.make)
        }
      })
    })
  }

  onSelectMake(make: any): void{
    this.filterCarList = [];
    // this.versionList = [];
    this.allCars.forEach(car => {
      if (car.naming.make === make){
        this.filterCarList.push(car);
        // this.versionList.push(car.naming.chargetrip_version);
      }
    })
  }

  onSelectVersion(version: any): void{
    this.filterCarList = [];
    this.allCars.forEach(car => {
      if (car.naming.chargetrip_version === version){
        this.filterCarList.push(car)
      }
    })
  }

  selectedCar(car: any) {
    let prev = this.store.getUserData()
    prev.carId = car.id;
    prev.carUrl = car.media.image.thumbnail_url;
    prev.carUsableKwh = car.battery.usable_kwh;
    this.store.setUserData(prev);
  }

  onSubmit() {
    let user = this.store.getUserData();
    if (user.carId === ''){
      return alert('Please select a car')
    }
    this._router.navigate(['discover'])
    return this.api.sendUser(user).subscribe(res => console.log('response',res));
  }

}
