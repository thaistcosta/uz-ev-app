import { Component, OnInit, Input, EventEmitter, Output, SimpleChange, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiClientService } from 'src/app/service/api-client.service';
import { StoreService } from 'src/app/service/store.service';
import * as Mapboxgl from 'mapbox-gl';
import * as mapboxPolyline from '@mapbox/polyline';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  @Input() map!: Mapboxgl.Map; 
  destinationPosition!: Mapboxgl.LngLatLike;
  currentPosition!: Mapboxgl.LngLatLike;
  route!: any;
  index: number = 1;
  indexTracker: number[] = [];
  userData!: User;
  newCurrentPosition!: Mapboxgl.LngLatLike;

  constructor(private api: ApiClientService, private store: StoreService) { }


  ngOnInit(): void {
    this.currentPosition = this.store.getCurrentPosition();
    this.destinationPosition = this.store.getDestinationPosition();
    this.route = this.store.getRouteData()
    this.userData = this.store.getUserData();
    this.buildMap();
  }
  
  buildMap(newCurrent?: any): void {

    if (newCurrent) this.currentPosition = newCurrent;

    (Mapboxgl as any).accessToken = environment.mapboxKey; 

    this.map = new Mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/thaistcosta/cl25ysdbo001014pd203ats61',
      center: this.currentPosition, // starting position LNG , LAT 
      zoom: 7 // starting zoom
    });

    this.map.on('load', () => {
    
      this.map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      this.map.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        paint: {
          'circle-radius': 1.5,
          'circle-color': '#448ee4'
        }
      });

      if (this.route !== undefined){
        this.polylineDecoder(this.route);
        this.routeHandler(this.route);
      }
  
    })
    

  }

  polylineDecoder(data: any) {
    const decodedData = mapboxPolyline.decode(data.polyline);
    const reversed = decodedData.map(elem => elem.reverse())
    this.coordsHandler(reversed);  
  
  }

  routeHandler(route: any): void {
    this.addingChargeStations(route.legs)
  }

  coordsHandler(coords: any): void {
    this.drawingRoute(coords)

    this.map.fitBounds([this.currentPosition, this.destinationPosition])
  }
  
  drawingRoute(coordinates: any): void {
    if (this.indexTracker.length !== 0) {
      this.indexTracker.forEach(el => {
        if (this.map.getLayer(`${el}`)) this.map.removeLayer(`${el}`);
        if (this.map.getSource(`${el}`)) this.map.removeSource(`${el}`); 
      })
      this.indexTracker = [];
    }
    this.drawingPolyline(coordinates, this.index);
    this.indexTracker.push(this.index)
    this.index++
  }

  drawingPolyline(coords: [number, number][], i: number): void {
  
    // new Mapboxgl.Marker().setLngLat(this.currentPosition).addTo(this.map);

    // this.map.addLayer({
    //   'id': 'origin',
    //   'type': 'circle',
    //   'paint': {
    //     'circle-radius': 1.5,
    //     'circle-color': '#448ee4'
    //   },
    //   'source': {
    //     'type': 'geojson',
    //     'lineMetrics': true,
    //     'data': {
    //       'type': 'Feature',
    //       'properties': {},
    //       'geometry': {
    //         'type': 'Point',
    //         'coordinates': (this.currentPosition as number[]),
    //       }
    //     }
    //   }
    // })

    this.map.addSource(`${i}`, {
      'type': 'geojson',
      'lineMetrics': true,
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coords
        }
      }
    });
  
    this.map.addLayer({
      'id': `${i}`,
      'type': 'line',
      'source': `${i}`,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round',
      },
      'paint': {
        'line-color': '#0078FF',
        'line-width': 5,
      },
    });

    
  }
 
  addingChargeStations(legs: [any]): void {
    if (!legs.length) return;
    if (this.map.getLayer('legs')) this.map.removeLayer('legs');
    if (this.map.getSource('legs')) this.map.removeSource('legs'); 

    let points: any[] = [];

    console.log(legs)
    legs.map((leg, index) => {
      if(index === 0){
        points.push({
          'type': 'Feature',
          'properties': {
            'icon': 'marker-stroked',
          },
          'geometry': leg.origin?.geometry,
        })
        points.push({
          'type': 'Feature',
          'properties': {
            'icon': 'charging-station',
          },
          'geometry': leg.destination?.geometry,
        })
      } else if (index !== legs.length - 1) {
        points.push({
          'type': 'Feature',
          'properties': {
            'icon': 'charging-station',
          },
          'geometry': leg.destination?.geometry,
        });
      } else {
        // add destination point (last leg)
        points.push({
          'type': 'Feature',
          'properties': {
            'icon': 'embassy',
          },
          'geometry': leg.destination?.geometry,
        });
      }
    });

    this.map.addLayer({
      'id': 'legs',
      'type': 'symbol',
      'layout': {
        'icon-image': '{icon}',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-size': 1.5,
      },
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': points,
        },
      },
    });
  }

  panic() {
    let prev = this.store.getDiscover()

    prev.batteryLevel = 7;

    this.store.setDiscover(prev);

    navigator.geolocation.getCurrentPosition((position) => {this.success.call(this, position)})

  }

  success(position: GeolocationPosition): any {

    let location = [position.coords.longitude, position.coords.latitude];
    this.currentPosition = (location as Mapboxgl.LngLatLike);

    this.store.setRouteData(location).subscribe(data => {

      this.api.getRoute(data.data.newRoute).subscribe((routeData: any) => {
          // checking if the data is not null
          if (routeData.data.route.route === null){
            this.api.routeSubscription(data.data.newRoute).subscribe(data => {
              // after receiving the data decoding the polyline propertie 
              if (data.data.routeUpdatedById.route !== null) {
                this.store.setRouteData(data.data.routeUpdatedById.route)
                this.route = data.data.routeUpdatedById.route;
                this.polylineDecoder(this.route);
                this.routeHandler(this.route);
              }
            });
          }
        });
    });
  }


  navigate(stops: any): void {
    console.log(stops)
    let googleUrl = `https://www.google.com/maps/dir/?api=1&origin=
    ${stops.legs[0].origin?.geometry?.coordinates.reverse()}&destination=
    ${stops.legs[stops.legs.length - 1].destination?.geometry?.coordinates.reverse()}`;
  
    if (stops.legs.length > 2) {
      googleUrl += `&waypoints=`;
      stops.legs.map((stop: any, index: number) => {
        if (index !== stops.legs.length - 1) {
          googleUrl += `${stop.destination?.geometry?.coordinates.reverse()}|`;
        }
      });
    }

    googleUrl += `&dir_action=navigate&travelmode=driving`;
  
    window.open(googleUrl);
    
  }
 

}

 

  

