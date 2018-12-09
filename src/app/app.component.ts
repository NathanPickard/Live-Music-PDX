import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fadeAnimation, routerTransition } from './animations';
import * as firebase from 'firebase';

import { HeaderComponent } from '../../src/app/core/header/header.component';
import { SideNavService } from '../../src/app/core/side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit, AfterViewInit {

  // @ViewChild(HeaderComponent) sidenav: (HeaderComponent);
  @ViewChild('sidenav') sidenav;

  constructor(private sideNavService: SideNavService) { }

  private sideNavSub;

  loadedFeature = 'artist';

  ngOnInit() {
    this.sideNavSub = this.sideNavService.openNav$.subscribe(() => this.sidenav.open());

    firebase.initializeApp({
      apiKey: "AIzaSyAnhG_Lit1FcibY2NF6UWGn0aaS8ZIZF58",
      authDomain: "live-music-pdx.firebaseapp.com"
    });
  }

  ngAfterViewInit() {

  }


  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
