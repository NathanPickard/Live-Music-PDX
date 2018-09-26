import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})

export class ArtistListComponent implements OnInit, OnDestroy {

  constructor(private artistService: ArtistService,
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  artists: Artist[];
  subscription: Subscription;
  artist: Artist;

  foundArtists: any[];

  foundArtistInfo: any;
  foundArtistList: any[];
  index: number;

  foundArtistName: string;
  // foundArtistName: 'name';
  foundArtistArray: Artist;
  // foundArtistArray: any;
  name: string;

  artistFound: boolean = false;
  searching: boolean = false;
  searchQuery: string;

  artistId: number;

  // queryValue = this.searchArtistForm.value;

  searchArtistForm: FormGroup;


  ngOnInit() {

    this.searchArtistForm = new FormGroup({
      'name': new FormControl(null, Validators.required)
    });

    this.subscription = this.artistService.artistsChanged
      .subscribe(
        (artists: Artist[]) => {
          this.artists = artists;
        }
      );
    this.artists = this.artistService.getArtists();


    this.searchArtistForm = new FormGroup({
      'artistSearchForm': new FormGroup({
        'searchQuery': new FormControl(null, [Validators.required])
      })
    });
  }

  handleSuccess(data) {
    this.artistFound = true;
    this.foundArtists = data.resultsPage.results.artist;
    this.foundArtistInfo = data.resultsPage.results.artist;
    this.foundArtistList = data.resultsPage.results;
    // console.log(data.resultsPage.results.artist.displayName);
  }

  handleError(error) {
    console.log(error);
  }

  onNewArtist() {
    this.router.navigate(['new'], { relativeTo: this.route });
    console.log(this.authService.isAuthenticated());
  }

  // searchArtists(query: string) {
  //   // console.log(this.searchArtistForm.value);
  //   this.searching = true;
  //   console.log(query);
  //   return this.searchService.getArtists(query).subscribe(
  //     data => this.handleSuccess(data),
  //     // data => console.log(data),
  //     error => this.handleError(error),
  //     () => this.searching = false
  //   );
  // }

  searchArtists() {
    this.searching = true;
    const query = this.searchArtistForm.value.artistSearchForm.searchQuery;
    console.log(query);
    return this.searchService.getArtists(query).subscribe(
      data => this.handleSuccess(data),
      // data => console.log(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  addArtistToList(foundArtistName: string, foundArtistId: number) {
    // console.log(this.foundArtistInfo);
    console.log(foundArtistName, foundArtistId);

    // this.foundArtistName = this.foundArtistArray;    

    // this.foundArtistArray = Artist;
    // this.foundArtistName = this.artist.name;

    // this.foundArtistArray = [foundArtistName, foundArtistId];
    // this.artist.id = foundArtistId;
    // console.log(this.artist.id);

    // this.foundArtistArray = [foundArtistName];

    // this.artist.name = foundArtistName;
    // this.artist.name = 'name';

    // this.artist = [foundArtistName, foundArtistId];
    // 'name': foundArtistName;
    // this.artist = foundArtistName;

    // this.artistService.addArtist(this.foundArtistArray);
    // this.artistService.addArtist(this.artist);

    // console.log(this.foundArtistList[index]);
    // this.handleSuccess(this.foundArtistInfo.results.artist.displayName);

    // return this.searchService.addArtistToList();
  }

  // onSubmit() {
  //   this.searchArtists(this.searchArtistForm.value);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}