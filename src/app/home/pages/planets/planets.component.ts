import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-planets',
  imports: [],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlanetsComponent {}
