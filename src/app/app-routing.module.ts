import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
// import { ArtistsComponent } from './artists/artists.component';
import { VenuesComponent } from './venues/venues.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artists', loadChildren: './artists/artists.module#ArtistsModule' },
  { path: 'venues', component: VenuesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }