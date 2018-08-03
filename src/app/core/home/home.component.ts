import { Component } from '@angular/core';

import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private searchService: SearchService) { }

  getPdxEvents() {
    return this.searchService.getPdxEvents().subscribe()
  }

}