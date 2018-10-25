import { Component } from '@angular/core';
// import { Response } from '@angular/http';
import { HttpEvent } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
    public authService: AuthService,
    public snackBar: MatSnackBar) { }

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
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(LogoutSnackbar, {
      duration: 1000,
    });
  }
}

@Component({
  selector: 'logout-snackbar',
  templateUrl: 'logout-snackbar.component.html',
})

export class LogoutSnackbar { }