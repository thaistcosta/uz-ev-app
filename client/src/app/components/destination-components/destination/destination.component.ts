import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiClientService } from 'src/app/service/api-client.service';
import { StoreService } from 'src/app/service/store.service';
import { Trip } from 'src/app/interfaces/trip.interface';
import { ChargingInfo } from 'src/app/interfaces/charginginfo.interface';
import { unwatchFile } from 'fs';


@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  trip!: Trip;
  charges!: ChargingInfo[];


  constructor(private api: ApiClientService, private store: StoreService) { }

  ngOnInit(): void {
    if (!this.trip || !this.charges){
      let data: any = this.store.getRouteData();
      this.trip = this.dataParser(data);
      this.charges = this.chargingInfo(data);
    }

  }

  dataParser(route: any): Trip {

    // bad practice here - I need to fix it later, dont have time now 
    if (typeof route.legs[0].duration !== 'string'){
      route.legs.forEach((el: any) => {
            el.duration = this.secondsConverter(el.duration)
            el.chargeTime = this.secondsConverter(el.chargeTime)
      })
    } 
      const obj = {
        routeId: route.id,
        routeType: route.type,
        stops: route.charges,
        totalDistance: Math.round((route.distance / 1000) * 100) / 100,
        rangeStartPercentage: route.rangeStartPercentage,
        rangeEndPercentage: route.rangeEndPercentage,
        legs: route.legs,
        totalDuration: this.secondsConverter(route.duration),
        drivingDuration: this.secondsConverter((route.duration - route.chargeTime)),
        chargeTime: this.secondsConverter(route.chargeTime),
      }
      return obj;
  }

  secondsConverter(seconds: number): string {
    let hours   = Math.floor(seconds / 3600); 
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);

    if (!hours) return `${minutes} min`;

    return `${hours} hr ${minutes} min`;
  }

  chargingInfo(route: any): ChargingInfo[] {
    
    return route.legs.map((leg: any, index: number): any => {

      let prev = this.store.getUserData();

      if (index !== (route.legs.length - 1)){
        let obj: any = {
          chargerName: '',
          connectorsAvailable: [],
          connector: '',
          rangeStart: 0,
          rangeEnd: 0,
          carUsableKwh: prev.carUsableKwh,
          chargeTime: '',
          km: 0,
          drivingTime: '',
        }
  
        let connec: any = {
          power: 0,
          standard: ''
        }
  
        connec.power = leg.connector.power;
        connec.standard = leg.connector.standard;

        obj.chargerName = leg.name;
        obj.rangeStart = Math.ceil((leg.rangeStartKwh / prev.carUsableKwh) * 100);
        obj.rangeEnd = Math.ceil((leg.rangeEndKwh / prev.carUsableKwh) * 100);
        obj.connector = connec;
        obj.chargeTime = leg.chargeTime;
        obj.km = Math.round((leg.distance / 1000) * 100) / 100;
        obj.drivingTime = leg.duration;

        obj.connectorsAvailable = leg.evse.connectors.map((el: any) => {
          let objCon = {
            power: el.power,
            standard: el.standard,
            power_type: el.power_type,
          }
          return objCon
        });
  
        return obj;
      } else {
        return null;
      }
    }).slice(0, (route.legs.length - 1));
  }
}
