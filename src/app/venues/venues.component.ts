/// <reference types="@types/googlemaps" />

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs/Subscription';

import { Venue } from './venue.model';
import { AuthService } from '../auth/auth.service';
import { VenueService } from '../venues/venue.service';
import { SearchService } from '../shared/search.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})

export class VenuesComponent implements OnInit, OnDestroy {

  @ViewChild('gmap', { static: true }) gmapElement: any;
  map: google.maps.Map;

  venueListLocation: any;
  venueId: any;

  // venueEventsArtistList = [];

  constructor(private venueService: VenueService,
    private dataStorageService: DataStorageService,
    private searchService: SearchService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['date', 'displayName', 'city', 'uri', 'datetime'];
  dataSource: any;

  venues: Venue[];
  subscription: Subscription;

  searching = false;
  venueFound = false;
  venueEventsFound = false;

  name: string;
  address: string;
  description: string;
  id: number;

  foundVenueName: string;
  foundVenueAddress: string;
  foundVenueDescription: string;
  foundVenueId: number;

  foundVenues: any[];
  venueEvents: any[];

  searchVenueForm: FormGroup;

  ngOnInit() {
    this.subscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.venues = this.venueService.getVenues();

    this.searchVenueForm = new FormGroup({
      'searchQuery': new FormControl(null, Validators.required)
    });

    this.authService.loadUser();
    this.authService.isAuthenticated();
    console.log(this.authService.isAuthenticated());

    if (this.authService.isAuthenticated() === true) {
      console.log('User is authenticated, now lets try to load venues');
      this.dataStorageService.getVenues();
      console.log(this.dataStorageService.getVenues());
    }

    for (let i = 0; i < this.venues.length; i++) {
      console.log(this.venues[i].id);
      this.getVenueListMarker(this.venues[i].id);
    }

    var mapProp = {
      center: new google.maps.LatLng(45.5212, -122.664),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  searchVenues() {
    this.searching = true;
    const query = this.searchVenueForm.value.searchQuery;
    console.log(query);
    return this.searchService.getVenues(query).subscribe(
      data => this.handleSuccess(data),
      // data => console.log(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  getSearchVenueEvents(foundVenueId) {
    this.searching = true;
    return this.searchService.getSelectedVenueEvents(foundVenueId).subscribe(
      data => this.handleVenueEventsSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  getVenueListMarker(venueId) {
    // this.venueId = this.venueService.getVenues();
    // console.log(this.venueId);
    // console.log(this.venue)

    // for (let i = 0; i < this.venueId.length; i++) {
    // console.log(this.venueId[i].id);
    return this.searchService.getVenueListLocation(venueId).subscribe(
      data => this.handleVenueListLocationSuccess(data),
      error => this.handleError(error)
    );
    // }
  }

  handleSuccess(data) {
    this.venueFound = true;
    this.foundVenues = data.resultsPage.results.venue;
    console.log(data.resultsPage.results.venue);

    for (let i = 0; i < data.resultsPage.results.venue.length; i++) {

      let location = new google.maps.LatLng(data.resultsPage.results.venue[i].lat, data.resultsPage.results.venue[i].lng);

      let venueName = (data.resultsPage.results.venue[i].displayName);

      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: venueName,
      });
    }
  }

  handleVenueEventsSuccess(data) {
    this.venueEventsFound = true;
    this.venueEvents = data.resultsPage.results.event;
    this.dataSource = this.venueEvents;

    // for(let i = 0; i < this.venueEvents.length; i++) {
    //   this.venueEventsArtistList.push(this.venueEvents);
    // }
    console.log(this.venueEvents);
    // console.log(this.venueEventsArtistList);
  }

  handleVenueListLocationSuccess(data) {
    // this.venueListLocationLat = data.resultsPage.results;
    console.log(this.venueListLocation);

    let location = new google.maps.LatLng(data.resultsPage.results.venue.lat, data.resultsPage.results.venue.lng);
    let venueName = (data.resultsPage.results.venue.displayName);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: venueName,
    });
  }

  handleError(error) {
    console.log(error);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onNewVenue() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  addVenueToList(foundVenueName: string, foundVenueAddress: string, foundVenueDescription: string, foundVenueId: number) {
    this.name = foundVenueName;
    this.address = foundVenueAddress;
    this.description = foundVenueDescription;
    this.id = foundVenueId;

    console.log(this.foundVenueName, this.foundVenueAddress, this.foundVenueDescription, this.foundVenueId);

    this.venueService.addVenue(new Venue(this.name, this.address, this.description, this.id));
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open(this.name + ' added', null, {
      duration: 1500
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
