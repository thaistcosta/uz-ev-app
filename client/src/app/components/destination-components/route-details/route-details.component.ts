import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/service/store.service'; 
import { DestinationComponent } from '../destination/destination.component';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  constructor(private store: StoreService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog();
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DestinationComponent, {
      height: '580px',
      width: '360px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
