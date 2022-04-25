import { Injectable } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { Observable, of } from 'rxjs';
import { Discover } from '../interfaces/discover.interface';
import { User } from '../interfaces/user.interface';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private destinationPosition!:  Mapboxgl.LngLatLike;
  private currentPosition!:  Mapboxgl.LngLatLike;
  private dataRoute!: any;
  private userData!: User;
  private discover!: Discover;
  
  constructor(private api: ApiClientService) { }

  setPositions(current: Mapboxgl.LngLatLike, destination:  Mapboxgl.LngLatLike): void{
    this.destinationPosition =  destination;
    this.currentPosition = current;
  }

  getCurrentPosition():  Mapboxgl.LngLatLike {
    return this.currentPosition
  }

  getDestinationPosition():  Mapboxgl.LngLatLike {
    return this.destinationPosition
  }

  getRouteData(): any { 
    return this.dataRoute;
  }

  setUserData(user: User): void {
    this.userData = user;
    console.log(user)
  }

  getUserData(): User {
    return this.userData;
  }
  
  setRoute(route: any): void {
    this.dataRoute = route;
  }

  setDiscover(disc: Discover): void {
    this.discover = disc;
  }

  getDiscover(): Discover {
    return this.discover
  }

  setRouteData(newCurrent?: any): Observable<any> {
    if(newCurrent) {
      console.log('1', newCurrent);
      console.log('2', this.destinationPosition);
      console.log('3', this.discover.passengers);
      console.log('4', this.discover.batteryLevel);
      return this.api.getRouteId(newCurrent, this.destinationPosition, this.userData.carId, 
      this.discover.batteryLevel, this.discover.passengers, this.discover.amenities);
    } else {
      return this.api.getRouteId(this.currentPosition, this.destinationPosition, this.userData.carId, 
        this.discover.batteryLevel, this.discover.passengers, this.discover.amenities);
    }
  }


}
