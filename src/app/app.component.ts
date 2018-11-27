import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fadeAnimation, routerTransition } from './animations';
import * as firebase from 'firebase';

import { HeaderComponent } from '../../src/app/core/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {

  // @ViewChild(HeaderComponent) sidenav: (HeaderComponent);

  
  loadedFeature = 'artist';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAnhG_Lit1FcibY2NF6UWGn0aaS8ZIZF58",
      authDomain: "live-music-pdx.firebaseapp.com"
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
