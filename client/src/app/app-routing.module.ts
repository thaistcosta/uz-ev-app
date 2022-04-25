import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './components/destination-components/discover/discover.component';
import { MapComponent } from './components/destination-components/map/map.component';
import { LoginComponent } from './components/login-component/login.component';
import { RegisterUserCarListComponent } from './components/register-components/register-user-car-list/register-user-car-list.component';
import { RegisterUserComponent } from './components/register-components/register-user/register-user.component';

const routes: Routes = [
  {path: 'register-car', component: RegisterUserCarListComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'discover', component: DiscoverComponent},
  {path: 'map', component: MapComponent},
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }