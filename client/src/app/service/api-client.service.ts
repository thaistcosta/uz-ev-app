import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';


// QUERIES
import { allCarsQuery, getRouteIdQuery, getRouteQuery, getRouteSubscription } from './queries';

@Injectable({
  providedIn: 'root'
})

export class ApiClientService {

  backendUrl: string = 'http://localhost:5000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private apollo: Apollo, private httpBackend: HttpBackend) { }

  carList(): Observable<any> {
    return this.apollo.watchQuery({
      query: allCarsQuery
    }).valueChanges
  }

  getRouteId(coordOrigin: mapboxgl.LngLatLike, coordDestination: mapboxgl.LngLatLike, 
    evId: string, evBattery: number, passengers: number, amenities?: string[]): Observable<any> {
    return this.apollo.mutate({
      mutation: getRouteIdQuery,
      variables: {
        coordOrigin,
        coordDestination,
        evId,
        evBattery,
        passengers,
        amenities
      }
    })
  }

  getRoute(routeId: string): Observable<any> {
      return this.apollo.watchQuery({
        notifyOnNetworkStatusChange: true,
        query: getRouteQuery,
        variables: {
          routeId,
        }
        }).valueChanges
  }

  routeSubscription(routeId: string): Observable<any> {
    return this.apollo.subscribe({
      query: getRouteSubscription,
      variables: {
        routeId,
      }
    })
  }

  sendUser(user: User): Observable<any> {
    console.log('here', user)
    return this.http.post(`${this.backendUrl}/user/signup`, user, this.httpOptions);
  } 


}