import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) { }

  onSaveData() {
    this.dataStorageService.storeArtists()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );

    this.dataStorageService.storeVenues()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }
}