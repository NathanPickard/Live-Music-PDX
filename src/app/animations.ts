import { trigger, animate, transition, style, group, query, state } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))],
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


export const routerTransition = trigger('routerTransition', [

  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' })
      , { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
      ], { optional: true }),
    ])
  ])


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
])