import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1 class="not-found__title">404 – Página no encontrada</h1>
      <p class="not-found__text">La página que estás buscando no existe o ha sido movida.</p>
      <a class="not-found__link" routerLink="/">Ir a la página de inicio</a>
    </div>
  `,
  styles: `
    @use 'variables' as *;

    .container {
      width: 100%;
      color: $color-white;
      text-align: center;
    }
    .not-found {
      &__title {
        font-size: 3.6rem;
      }
      &__text {
        font-size: 2rem;
      }
      &__link {
        margin-top: 2rem;
        color: $color-white;
        font-size: 2rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundComponent {}
