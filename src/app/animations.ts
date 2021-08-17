import { trigger, animate, animateChild, transition, style, group, query, state } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('0.15s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.15s', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);

export const fade = trigger('fade', [
  state('void', style({ opacity: 0 })),

  transition(':enter, :leave', [
    animate(1000)
  ])
]);

// export const routerTransition = trigger('routerTransition', [

//   transition('* => *', [
//     query(':enter, :leave', style({ position: 'fixed', width: '100%' })
//       , { optional: true }),
//     group([
//       query(':enter', [
//         style({ transform: 'translateX(-100%)' }),
//         animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
//       ], { optional: true }),
//       query(':leave', [
//         style({ transform: 'translateX(0%)' }),
//         animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
//       ], { optional: true }),
//     ])
//   ])


  // transition('* => artists', [
  //   query(':enter, :leave', style({ position: 'fixed', width:'100%' })
  //     , { optional: true }),
  //   group([
  //     query(':enter', [
  //       style({ transform: 'translateX(-100%)' }),
  //       animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
  //     ], { optional: true }),
  //     query(':leave', [
  //       style({ transform: 'translateX(0%)' }),
  //       animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
  //     ], { optional: true }),
  //   ])
  // ]),
  // transition('* => venues', [
  //   group([
  //     query(':enter, :leave', style({ position: 'fixed', width:'100%' })
  //     , { optional: true }),
  //     query(':enter', [
  //       style({ transform: 'translateX(100%)' }),
  //       animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
  //     ], { optional: true }),
  //     query(':leave', [
  //       style({ transform: 'translateX(0%)' }),
  //       animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
  //     ], { optional: true }),
  //   ])
  // ])
// ]);

export const routerTransition = trigger('routerTransition', [
  transition('Home => Events, Home => Venues, Home => Artists, Home => About, Events => Venues, Events => Artists, Events => About, Venues => Artists, Venues => About, Artists => About', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({
        right: '100%',
        opacity: 0
      }))]),
      query(':enter', [animate('300ms ease-out', style({
        right: '0%',
        opacity: 1
      }))])
    ]),
    query(':enter', animateChild())
  ]),
  transition('About => Artists, About => Venues, About => Events, About => Home, Artists => Venues, Artists => Events, Artists => Home, Venues => Events, Venues => Home, Events => Home', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({
        left: '100%',
        opacity: 0
      }))]),
      query(':enter', [animate('300ms ease-out', style({
        left: '0%',
        opacity: 1
      }))])
    ]),
    query(':enter', animateChild())
  ])
]);
