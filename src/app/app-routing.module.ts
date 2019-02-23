import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
// import { RegisterComponent } from './auth/register/register.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artists', loadChildren: './artists/artists.module#ArtistsModule' },
  { path: 'venues', loadChildren: './venues/venues.module#VenuesModule' },
  { path: 'events', loadChildren: './events/events.module#EventsModule' },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
