import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Artist } from '../artist.model';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})

export class ArtistDetailComponent implements OnInit {
  artist: Artist;

  constructor(private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
  }
}