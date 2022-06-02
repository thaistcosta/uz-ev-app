import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/service/store.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  panicLevel!: number;
  user!: User;

  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.user = this.store.getUserData();
  }

  panic(battery: any): void {
    let user = this.store.getUserData()
    user.panicLevel = battery.value;
    this.store.setUserData(user);
  }
}
