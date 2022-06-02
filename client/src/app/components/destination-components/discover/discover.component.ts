import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiClientService } from 'src/app/service/api-client.service';
import { StoreService } from 'src/app/service/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Router } from '@angular/router';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  map!: Mapboxgl.Map;
  geocoder!: MapboxGeocoder;
  geocoderDestination!: MapboxGeocoder;
  currentPosition!: Mapboxgl.LngLatLike;
  destinationPosition!: Mapboxgl.LngLatLike;
  discoverForm!: FormGroup;
  selectedAmenities: string[] = []
  amenities: string[] = ['Restaurants', 'Hotel', 'Cafe', 'Groceries'];

  constructor(private api: ApiClientService, private store: StoreService, private formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.geocoderBuilder()
    this.discoverFormBuilder()
  }

  discoverFormBuilder() {
    this.discoverForm = this.formBuilder.group({
      batteryLevel: ['', Validators.required],
      passengers: ['', Validators.required],
    })
  }

  geocoderBuilder(): void {
    
    navigator.geolocation.getCurrentPosition((position) => {this.success.call(this, position)});
    
    // create my geocoding search for destination 
    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapboxKey,
      mapboxgl: this.map,
      placeholder: 'Choose your destination',
      reverseGeocode: true, // reverse lat, lgn
    });

    this.geocoder.addTo('#geocoder');

    this.geocoder.on('result', (e) => {
      this.destinationPosition = e.result.center;
      this.store.setPositions(this.currentPosition, this.destinationPosition); // check again - need better solution
    });
  }

  success(position: GeolocationPosition): any {
    this.currentPosition = [position.coords.longitude, position.coords.latitude];
  }

  
  onSubmit(){

    this.discoverForm.value.amenities = this.selectedAmenities;
    let car = this.store.getUserData();
    
    console.log(car)
    console.log(this.discoverForm.value.batteryLevel)
    this.discoverForm.value.batteryLevel = ((car.carUsableKwh * this.discoverForm.value.batteryLevel) / 100);

   console.log(this.discoverForm.value.batteryLevel);

    // formating the data
    if (this.discoverForm.value.amenities)
    this.discoverForm.value.amenities.map((el: string) => el.toUpperCase())

    this.store.setDiscover(this.discoverForm.value);

    this.store.setRouteData().subscribe(data => {
      this.api.getRoute(data.data.newRoute)
        .subscribe((routeData: any) => {
          // checking if the data is not null
          if (routeData.data.route.route === null){
            this.api.routeSubscription(data.data.newRoute).subscribe(data => {
              // after receiving the data decoding the polyline propertie 
              if (data.data.routeUpdatedById.route !== null){
                this.store.setRoute(data.data.routeUpdatedById.route);
                this._router.navigate(['map'])
              }
              }
            )
          }
        });
    });
  }

  toggleSelection(chip: MatChip): void {
    if (this.selectedAmenities.includes(chip.value)){
      this.selectedAmenities = this.selectedAmenities.filter(
        (amenitie: string) => amenitie !== chip.value);
    } else{
      this.selectedAmenities.push(chip.value)
    }
    chip.toggleSelected();
 }
}
