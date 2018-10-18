import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from './animations';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
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
