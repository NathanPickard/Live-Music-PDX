import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSort, MatTableDataSource, MatTable, PageEvent } from '@angular/material';


import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { SearchService } from '../../shared/search.service';
import { AuthService } from '../../auth/auth.service';

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
    private dialog: MatDialog,
    private authService: AuthService) { }

  displayedColumns: string[] = ['date', 'displayName', 'venue', 'uri', 'datetime'];
  dataSource: any;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.artist = this.artistService.getArtist(this.id);
        }
      );
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
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
    this.dataSource = this.foundEvents;
    console.log(data.resultsPage.results);
  }

  handleError(error) {
    console.log(error);
  }

  getArtistEvents() {
    // return this.searchService.getArtistEvents(this.artist).subscribe(
    //   data => this.handleSuccess(data),
    //   error => this.handleError(error)
    // );
    console.log(this.artist.id);
    return this.searchService.getSelectedArtistEvents(this.artist.id).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );
  }

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
