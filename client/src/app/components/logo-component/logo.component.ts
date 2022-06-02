import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.login();
  }

  login() {
    setTimeout(() => {
      this._router.navigate(['login'])
    }, 4000)
  }

}
