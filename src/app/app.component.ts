import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpEvent } from '@angular/common/http';

import { fadeAnimation, routerTransition } from './animations';
import * as firebase from 'firebase';

import { AuthService } from '../app/auth/auth.service';
import { DataStorageService } from '../app/shared/data-storage.service';

import { SideNavService } from '../../src/app/core/side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit, AfterViewInit {

  // @ViewChild(HeaderComponent) sidenav: (HeaderComponent);
  @ViewChild('sidenav', { static: true }) sidenav;

  constructor(public authService: AuthService,
    public dataStorageService: DataStorageService,
    private sideNavService: SideNavService) { }

  private sideNavSub;

  loadedFeature = 'artist';

  ngOnInit() {
    this.sideNavSub = this.sideNavService.openNav$.subscribe(() => this.sidenav.open());

    firebase.initializeApp({
      apiKey: "AIzaSyAnhG_Lit1FcibY2NF6UWGn0aaS8ZIZF58",
      authDomain: "live-music-pdx.firebaseapp.com"
    });

    this.authService.isAuthenticated();

    this.authService.loadUser();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onFetchData() {
    this.dataStorageService.getArtists();
    this.dataStorageService.getVenues();
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

  onLogout() {
    this.authService.logout();
    // this.openSnackBar();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  ngAfterViewInit() {
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
