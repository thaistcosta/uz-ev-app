import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiClientService } from 'src/app/service/api-client.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  route: any = [];

  constructor(private api: ApiClientService, private store: StoreService) { }

  ngOnInit(): void {
    this.store.getRouteData()
  }

  navigate(stops: any[]): void {
    if (!stops.length) return;

    let googleUrl = `https://www.google.com/maps/dir/?api=1&origin=
    ${stops[stops.length - 1].legs[0].origin?.geometry?.coordinates.reverse()}&destination=
    ${stops[stops.length - 1].legs[stops[stops.length - 1].legs.length - 1].destination?.geometry?.coordinates.reverse()}`;
  
    if (stops[stops.length - 1].legs.length > 2) {
      googleUrl += `&waypoints=`;
      stops[stops.length - 1].legs.map((stop: any, index: number) => {
        if (index !== stops[stops.length - 1].legs.length - 1) {
          googleUrl += `${stop.destination?.geometry?.coordinates.reverse()}|`;
        }
      });
    }

    googleUrl += `&dir_action=navigate&travelmode=driving`;
  
    window.location.href = googleUrl;
    
  }

}


/// DISCOVER 
// MAP - DESTINATION -- ROUTE DETAILS