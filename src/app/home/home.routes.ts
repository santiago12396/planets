import { Routes } from '@angular/router';

export default [
  {
    path: 'planetas',
    loadComponent: () => import('@/home/pages/planets/planets.component'),
    title: 'Planetas',
  },
  {
    path: 'ver-planeta/:id',
    loadComponent: () => import('@/home/pages/view-planet/view-planet.component'),
    title: 'Planeta',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'planetas',
  },
  {
    path: '**',
    redirectTo: 'planetas',
  },
] as Routes;
