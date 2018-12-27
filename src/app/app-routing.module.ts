import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
// import { RegisterComponent } from './auth/register/register.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artists', loadChildren: './artists/artists.module#ArtistsModule' },
  { path: 'venues', loadChildren: './venues/venues.module#VenuesModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
