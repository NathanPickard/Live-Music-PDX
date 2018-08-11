import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})

export class ArtistDetailComponent implements OnInit {

  artist: Artist;
  id: number;
  foundEvents: any[];
  eventsFound: boolean = false;

  constructor(private artistService: ArtistService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.artist = this.artistService.getArtist(this.id);
        }
      );
  }

  onEditArtist() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteArtist() {

    const dialogRef = this.dialog.open(ArtistDetailDialog, {
      data: { name: this.artist.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.artistService.deleteArtist(this.id);
        this.router.navigate(['/artists']);
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

  // getArtistEvents() {
  //   return this.searchService.getArtistEvents(this.artist).subscribe(
  //     data => this.handleSuccess(data),
  //     error => this.handleError(error)
  //   );
  // }
}


@Component({
  selector: 'artist-detail-dialog',
  templateUrl: 'artist-detail-dialog.component.html'
})

export class ArtistDetailDialog {

  // name: string;

  constructor(public dialogRef: MatDialogRef<ArtistDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Artist) { }
}