import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Body } from '@/shared/models/system-solar.model';

@Component({
  selector: 'app-planet-item',
  templateUrl: './planet-item.component.html',
  styleUrl: './planet-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetItemComponent {
  planet = input.required<Body>();

  readonly #router = inject(Router);

  handleViewPlanet(id: string) {
    this.#router.navigate(['/ver-planeta', id]);
  }
}
