import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Artist } from '../artist.model';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})

export class ArtistListComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  onNewArtist() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}