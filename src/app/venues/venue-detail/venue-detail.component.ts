import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Venue } from '../venue.model';
import { VenueService } from '../venue.service';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})

export class VenueDetailComponent implements OnInit {
  venue: Venue;
  id: number;

  constructor(private venueService: VenueService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

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
      width: '300px'
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.venueService.deleteVenue(this.id);
        this.router.navigate(['/venues']);
      }
    });
  }
}


@Component({
  selector: 'venue-detail-dialog',
  templateUrl: 'venue-detail-dialog.component.html'
})
export class VenueDetailDialog {
  constructor(public dialogRef: MatDialogRef<VenueDetailDialog>) { }
}