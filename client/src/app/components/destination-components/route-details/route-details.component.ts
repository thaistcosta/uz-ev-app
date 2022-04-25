import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Trip } from 'src/app/interfaces/trip.interface';
import { StoreService } from 'src/app/service/store.service'; 

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  trip!: Trip;
  isOpen: boolean = true;
  data!: any;
  showFiller = false;
  // @Output() data: EventEmitter<any> = new EventEmitter;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.data = this.store.getRouteData()
    this.dataParser(this.data);
  }

  dataParser(route: any): void {

    route.legs.forEach((el: any) => {
      el.duration = this.secondsConverter(el.duration)
      el.chargeTime = this.secondsConverter(el.chargeTime)
    })

    const obj = {
      routeId: route.id,
      routeType: route.type,
      stops: route.charges,
      totalDistance: Math.round((route.distance / 1000) * 100) / 100,
      totalDuration: this.secondsConverter(route.duration),
      chargeTime: this.secondsConverter(route.chargeTime),
      rangeStartPercentage: route.rangeStartPercentage,
      rangeEndPercentage: route.rangeEndPercentage,
      legs: route.legs,
    }
    this.trip = obj;
  }

  secondsConverter(seconds: number): string {
    let hours   = Math.floor(seconds / 3600); 
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);

    if (!hours) return `${minutes} min`;

    return `${hours} hr ${minutes} min`;
  }


}
