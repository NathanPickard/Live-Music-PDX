import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})

export class ArtistListComponent implements OnInit, OnDestroy {
  artists: Artist[];
  subscription: Subscription;

  foundArtists: any[];
  artistFound: boolean = false;
  searching: boolean = false;

  handleSuccess(data) {
    this.artistFound = true;
    this.foundArtists = data.resultsPage.results.artist;
    console.log(data.resultsPage.results.artist);
  }

  handleError(error) {
    console.log(error);
  }

  constructor(private artistService: ArtistService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.artistService.artistsChanged
      .subscribe(
        (artists: Artist[]) => {
          this.artists = artists;
        }
      );
    this.artists = this.artistService.getArtists();
  }

  onNewArtist() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  searchArtists(query: string) {
    this.searching = true;
    return this.searchService.getArtists(query).subscribe(
      data => this.handleSuccess(data),
      // data => console.log(data),
      error => this.handleError(error),
      () => this.searching = false
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}