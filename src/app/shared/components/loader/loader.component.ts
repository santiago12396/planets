import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: '<div class="loader"></div>',
  styles: `
    .loader {
      --b: 10px;
      width: calc(12 * var(--b));
      aspect-ratio: 1;
      border-radius: 50%;
      background:
        repeating-radial-gradient(
            calc(2 * var(--b)) at top,
            #0000 -1px,
            #fff 0 calc(50% - 1px),
            #0000 50% calc(100% - 1px)
          )
          calc(50% + var(--b)) 100%,
        repeating-radial-gradient(
            calc(2 * var(--b)) at bottom,
            #fff -1px,
            #0000 0 calc(50% - 1px),
            #fff 50% calc(100% - 1px)
          )
          50% 0;
      background-size: 150% 50%;
      background-repeat: no-repeat;
      mask:
        radial-gradient(
            calc(1.5 * var(--b)) at calc(100% - var(--b) / 2) 0,
            #0000 calc(100% / 3),
            #fff calc(100% / 3 + 1px) 110%,
            #0000 0
          )
          calc(50% + var(--b) / 2) 100% / calc(3 * var(--b)) 50% exclude no-repeat,
        conic-gradient(#fff 0 0);
      animation: l20 1s infinite linear;
    }
    @keyframes l20 {
      100% {
        transform: rotate(1turn);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
