/* SPDX-License-Identifier: MIT */
/* Copyright © 2024-2025 Andreas Gödecke */

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'widget',
    children: [
      {
        path: 'nd-filter-solver',
        loadComponent: () =>
          import('./widgets/nd-filter-solver/nd-filter-solver.component').then(
            (c) => c.NdFilterSolverComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'nd-filter-solver',
      },
    ],
  },
  // {
  // 	path: 'about',
  // 	loadComponent: () => import('./about/about.component').then(c => c.AboutComponent)
  // },
  { path: '**', redirectTo: 'widget/nd-filter-solver' },
];
