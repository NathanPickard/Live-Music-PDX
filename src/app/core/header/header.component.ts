import { Component } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})  

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
    private sideNavService: SideNavService,
    public authService: AuthService,
    public snackBar: MatSnackBar) { }

  openNav() {
    this.sideNavService.openNav();
  }

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

  isAuthenticated() {
    return this.authService.isAuthenticated();
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
