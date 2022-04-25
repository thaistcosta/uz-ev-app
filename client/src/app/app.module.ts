import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders, HttpBackend } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {} from 'dotenv/config';


// COMPONENTS
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-components/register-user/register-user.component';
import { RegisterUserFormComponent } from './components/register-components/register-user-form/register-user-form.component';
import { RegisterUserCarListComponent } from './components/register-components/register-user-car-list/register-user-car-list.component';
import { RegisterUserCarDetailsComponent } from './components/register-components/register-user-car-details/register-user-car-details.component';
import { RouteDetailsComponent } from './components/destination-components/route-details/route-details.component';
import { DestinationComponent } from './components/destination-components/destination/destination.component';
import { MapComponent } from './components/destination-components/map/map.component';
import { LoginComponent } from './components/login-component/login.component';


// APOLLO 
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloClientOptions, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';


// FORM
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DiscoverComponent } from './components/destination-components/discover/discover.component';



// MATERIAL UI
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips'
import { MatStepperModule } from '@angular/material/stepper'; // this
import { OverlayModule } from '@angular/cdk/overlay' // this
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav' // this
import { MatIconModule } from '@angular/material/icon'; // this
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'; //this
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    RegisterUserFormComponent,
    RegisterUserCarListComponent,
    RegisterUserCarDetailsComponent,
    DestinationComponent,
    MapComponent,
    LoginComponent,
    RouteDetailsComponent,
    DiscoverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ApolloModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatChipsModule,
    MatStepperModule, // this
    MatSidenavModule, // this
    OverlayModule, // this 
    MatIconModule, // this
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink): ApolloClientOptions<any> => {
      
        const http = httpLink.create({
          uri: 'https://api.chargetrip.io/graphql',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-client-id': '6259290bd43a4cf4870e497a',
          })
        });
      
        const ws = new WebSocketLink({
          uri: 'wss://api.chargetrip.io/graphql',
          options: {
          reconnect: true,
          connectionParams: {
            'x-client-id': '6259290bd43a4cf4870e497a',
            }
          }
        })

        const link = split(
          ({query}) => {
            const data = getMainDefinition(query);
            return (
              data.kind === 'OperationDefinition' && data.operation === 'subscription'
            );
          },
          ws,
          http,
        );
      return {
        link,
        cache: new InMemoryCache(),
      }
    },
    deps: [HttpLink]
  }, {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false} 
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
