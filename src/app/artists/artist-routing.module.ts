import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistsComponent } from './artists.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { ArtistStartComponent } from './artist-start/artist-start.component';
import { AuthGuard } from '../auth/auth-guard.service';

const artistsRoutes: Routes = [
  {
    path: '', component: ArtistsComponent, children: [
      { path: '', component: ArtistStartComponent },
      { path: 'new', component: ArtistEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: ArtistDetailComponent },
      { path: ':id/edit', component: ArtistEditComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(artistsRoutes)
  ],
  exports: [RouterModule],
  providers: []
})

export class ArtistsRoutingModule { }
