import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})

export class ArtistDetailComponent implements OnInit {
  artist: Artist;
  id: number;

  constructor(private artistService: ArtistService, private route: ActivatedRoute, private router: Router) { }

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
    this.artistService.deleteArtist(this.id);
    this.router.navigate(['/artists']);
  }
}