import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Venue } from '../venue.model';
import { VenueService } from '../venue.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit, OnDestroy {
  venues: Venue[];
  subscription: Subscription;

  constructor(private venueService: VenueService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.venues = this.venueService.getVenues();
  }

  onNewVenue() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
