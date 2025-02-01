import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Body } from '@/shared/models/system-solar.model';

@Component({
  selector: 'app-planet-item',
  imports: [],
  templateUrl: './planet-item.component.html',
  styleUrl: './planet-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetItemComponent {
  planet = input.required<Body>();
}
