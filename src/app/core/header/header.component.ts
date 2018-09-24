import { Component } from '@angular/core';
// import { Response } from '@angular/http';
import { HttpEvent } from '@angular/common/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
    public authService: AuthService) { }

  onSaveData() {
    this.dataStorageService.storeArtists()
      .subscribe(
        (response: HttpEvent<Object>) => {
          console.log(response);
        }
      );

    this.dataStorageService.storeVenues()
      .subscribe(
        (response: HttpEvent<Object>) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getArtists();
    this.dataStorageService.getVenues();
  }

  onLogout() {
    this.authService.logout();
  }
}