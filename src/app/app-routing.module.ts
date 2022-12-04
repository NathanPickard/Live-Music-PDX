import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    data: { animationState: 'Home' }
  },
  {
    path: 'artists',
    loadChildren: () => import('./artists/artists.module').then(m => m.ArtistsModule),
    data: { animationState: 'Artists' }
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
    data: { animationState: 'Events' }
  },
  {
    path: 'venues',
    loadChildren: () => import('./venues/venues.module').then(m => m.VenuesModule),
    data: { animationState: 'Venues' }
  },
  {
    path: 'about', component: AboutComponent,
    data: { animationState: 'About' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
