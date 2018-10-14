import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fade', [

      state('void', style({ opacity: 0 })),

      transition(':enter, :leave', [
        animate(1500)
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  foundEvents: any[];
  foundArtists: any[];
  eventsFound: boolean = false;
  type: any[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getPdxEvents();
  }

  handleSuccess(data) {
    this.eventsFound = true;
    this.foundEvents = data.resultsPage.results.event;
    // this.foundArtists = data.resultsPage.results.event.performance.artist;
    // console.log(this.foundArtists);
    console.log(this.foundEvents);
    console.log(data.resultsPage.results);
  }

  handleError(error) {
    console.log(error);
  }

  getPdxEvents() {
    return this.searchService.getPdxEvents().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
    );
  }

}