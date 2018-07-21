import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(private artistService: ArtistService,
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
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.artistService.deleteArtist(this.id);
        this.router.navigate(['/artists']);
      }
    });
  }
}

@Component({
  selector: 'artist-detail-dialog',
  templateUrl: 'artist-detail-dialog.component.html'
})
export class ArtistDetailDialog {

  constructor(public dialogRef: MatDialogRef<ArtistDetailDialog>) { }
}