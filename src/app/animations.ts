import {animate, keyframes, style, transition, trigger} from '@angular/animations';

export const fadeInOut = trigger(
  'fadeInOut',
  [
    transition('* => void', [
      style({ height: '*' }),
      animate(250, style({ height: 0 }))
    ]),
    transition('void => *', [
      style({ height: '0' }),
      animate(250, style({ height: '*' }))
    ])
  ]
);

export const loginAnimation = trigger(
  'loginAnimation',
  [
    transition(
      'void => *', [
        animate(800, keyframes([
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
          style({opacity: .2, transform: 'translateY(-75%)', offset: 0.2}),
          style({opacity: .4, transform: 'translateY(-60%)', offset: 0.4}),
          style({opacity: 1, transform: 'translateY(-50%)', offset: 1.0})
        ]))
      ]
    )
  ]
);
