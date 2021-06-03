import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artists', loadChildren: () => import('./artists/artists.module').then(m => m.ArtistsModule) },
  { path: 'venues', loadChildren: () => import('./venues/venues.module').then(m => m.VenuesModule) },
  { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
