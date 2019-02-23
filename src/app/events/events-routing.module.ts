import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { EventStartComponent } from './event-start/event-start.component';

const eventsRoutes: Routes = [
  {
    path: '', component: EventsComponent, children: [
      { path: '', component: EventStartComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(eventsRoutes)
  ],
  exports: [RouterModule],
  providers: []
})

export class EventsRoutingModule { }
