import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-planet',
  imports: [],
  templateUrl: './view-planet.component.html',
  styleUrl: './view-planet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ViewPlanetComponent {}
