import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Venue } from '../venue.model';
import { VenueService } from '../venue.service';
import { SearchService } from '../../shared/search.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})

export class VenueDetailComponent implements OnInit {
  venue: Venue;
  id: number;
  foundEvents: any[];
  eventsFound: boolean = false;

  constructor(private venueService: VenueService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.venue = this.venueService.getVenue(this.id);
        }
      );
  }

  onEditVenue() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteVenue() {
    const dialogRef = this.dialog.open(VenueDetailDialog, {
      data: { name: this.venue.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.venueService.deleteVenue(this.id);
        this.router.navigate(['/venues']);
      }
    });
  }

  handleSuccess(data) {
    this.eventsFound = true;
    this.foundEvents = data.resultsPage.results.event;
    console.log(data.resultsPage.results);
  }

  handleError(error) {
    console.log(error);
  }

  getVenueEvents(venueId: number) {
    return this.searchService.getSelectedVenueEvents(this.venue.id).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );
  }

}


@Component({
  selector: 'venue-detail-dialog',
  templateUrl: 'venue-detail-dialog.component.html'
})
export class VenueDetailDialog {
  constructor(public dialogRef: MatDialogRef<VenueDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Venue) { }
}