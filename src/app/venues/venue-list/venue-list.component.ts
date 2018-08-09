import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Venue } from '../venue.model';
import { VenueService } from '../venue.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit, OnDestroy {
  venues: Venue[];
  subscription: Subscription;

  foundVenues: any[];
  venueFound: boolean = false;
  searching: boolean = false;

  constructor(private venueService: VenueService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.venues = this.venueService.getVenues();
  }

  handleSuccess(data) {
    this.venueFound = true;
    this.foundVenues = data.resultsPage.results.venue;
    console.log(data.resultsPage.results.venue);
  }

  handleError(error) {
    console.log(error);
  }

  onNewVenue() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  searchVenues(query: string) {
    this.searching = true;
    return this.searchService.getVenues(query).subscribe(
      data => this.handleSuccess(data),
      // data => console.log(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
