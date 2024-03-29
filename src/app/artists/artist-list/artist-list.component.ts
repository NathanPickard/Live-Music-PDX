import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { fade } from '../../animations';
import { Subscription } from 'rxjs/Subscription';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { SearchService } from '../../shared/search.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  animations: [
    [fade]
  ]
})

export class ArtistListComponent implements OnInit, OnDestroy {

  constructor(private artistService: ArtistService,
    private dataStorageService: DataStorageService,
    public authService: AuthService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  displayedColumns: string[] = ['date', 'displayName', 'city', 'venue', 'uri', 'datetime'];
  dataSource: any;

  artists: Artist[];
  subscription: Subscription;
  artist: Artist;

  foundArtists: any[];
  similarArtists: any[];
  artistEvents: any[];

  foundArtistInfo: any;
  foundArtistId: any;
  foundArtistList: any[];
  index: number;

  foundArtistName: string;
  foundArtistArray: Artist;
  name: string;
  id: number;

  artistFound = false;
  artistEventsFound = false;
  searching = false;
  searchQuery: string;
  searchingArtist = false;
  searchArtistSubmitted = false;
  searchArtistNotFound = false;

  artistId: any;

  searchArtistForm: UntypedFormGroup;

  userToken: any;

  filteredArtists: any[];
  isLoading = false;
  errorMsg: string;


  ngOnInit() {
    this.searchArtistForm = new UntypedFormGroup({
      'name': new UntypedFormControl(null, Validators.required)
    });

    this.subscription = this.artistService.artistsChanged
      .subscribe(
        (artists: Artist[]) => {
          this.artists = artists;
        }
      );
    this.artists = this.artistService.getArtists();

    this.searchArtistForm = new UntypedFormGroup({
      'searchQuery': new UntypedFormControl(null, Validators.required)
    });

    this.authService.loadUser();
    this.authService.isAuthenticated();

    if (this.authService.isAuthenticated() === true) {
      console.log('User is authenticated, nows lets load the saved artists');
      this.dataStorageService.getArtists();
    }

    this.searchArtistForm.get('searchQuery').valueChanges
      .pipe(debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.filteredArtists = [];
          this.isLoading = true;
        }),
        switchMap(value => this.searchService.getArtists(value)
          .pipe(finalize(() => {
            this.isLoading = false;
          }),
          )
        )
      )
      .subscribe(data => {
        // if (data['Search'] == undefined) {
        if (data !== undefined) {
          console.log('Got results');
          // this.filteredArtists = [];
          this.filteredArtists = data.resultsPage.results.artist;
          this.errorMsg = '';
        } else {
          this.errorMsg = data['Error'];
          // this.filteredArtists = data['Search'];
          console.log(data);
          this.filteredArtists = data.resultsPage.results.artist;
          console.log(this.filteredArtists);
          // this.filteredArtists = data;
        }
        console.log(this.filteredArtists);
      });
  }

  handleSuccess(data) {
    this.artistFound = true;
    this.foundArtists = data.resultsPage.results.artist;
    this.foundArtistInfo = data.resultsPage.results.artist;
    this.foundArtistId = data.resultsPage.results.artist.id;
    this.foundArtistList = data.resultsPage.results;

    console.log(this.foundArtists);

    if (this.foundArtists === undefined || this.foundArtists.length === 0) {
      this.searchArtistNotFound = true;
    }
  }

  handleSimilarArtistsSuccess(data) {
    this.similarArtists = data.resultsPage.results.artist;
    console.log(this.similarArtists);
  }

  handleArtistEventsSuccess(data) {
    this.artistEventsFound = true;
    this.artistEvents = data.resultsPage.results.event;
    this.dataSource = this.artistEvents;
  }

  handleError(error) {
    console.log(error);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onNewArtist() {
    this.router.navigate(['new'], { relativeTo: this.route });
    console.log(this.authService.isAuthenticated());
  }

  searchArtists() {
    this.similarArtists = null;
    this.searchingArtist = true;
    this.searchArtistSubmitted = true;
    const query = this.searchArtistForm.value.searchQuery;
    console.log(query);
    console.log(this.authService.isAuthenticated());
    return this.searchService.getArtists(query).subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error),
      () => this.searchingArtist = false
    );
  }

  searchSimilarArtist(foundArtistId) {
    this.searching = true;
    // const artistId = foundArtistId;
    return this.searchService.getSimilarArtists(foundArtistId).subscribe(
      data => this.handleSimilarArtistsSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  getSearchArtistEvents(foundArtistId) {
    this.searching = true;
    return this.searchService.getSelectedArtistEvents(foundArtistId).subscribe(
      data => this.handleArtistEventsSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  getUserToken() {
    this.userToken = this.authService.getToken();
    console.log(this.userToken);
    console.log(this.authService.isAuthenticated());
  }

  addArtistToList(foundArtistName: string, foundArtistId: number) {

    // this.foundArtistName = foundArtistName;
    // this.foundArtistId = foundArtistId;

    this.name = foundArtistName;
    this.id = foundArtistId;
    console.log(this.foundArtistName, this.foundArtistId);

    this.artistService.addArtist(new Artist(this.name, this.id));

    this.openSnackBar();
    // return this.searchService.addArtistToList();
  }

  openSnackBar() {
    // this.snackBar.openFromComponent(ArtistSnackbar, {
    //   duration: 1000,
    // });
    this.snackBar.open(this.name + ' added', null, {
      duration: 1500
    });
  }

  addOnUnauthenticated() {
    const dialogRef = this.dialog.open(ArtistListDialog, {})
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.artists, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

// @Component({
//   selector: 'artist-snackbar',
//   templateUrl: 'artist-snackbar.component.html'
// })
// export class ArtistSnackbar { }

@Component({
  selector: 'artist-list-dialog',
  templateUrl: 'artist-list-dialog.component.html'
})

export class ArtistListDialog {
  constructor(public dialogRef: MatDialogRef<ArtistListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Artist) { }
}
