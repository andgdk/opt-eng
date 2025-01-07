/* SPDX-License-Identifier: MIT */
/* Copyright © 2024-2025 Andreas Gödecke */

import type { Signal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';

import type { Coefficients, Constraint, Solution } from 'yalps';

import { SolverService } from './solver.service';

import type { Detector, DetectorType, Filter } from './solver.model';

@Component({
  selector: 'nd-solver',
  imports: [],
  templateUrl: './solver.component.html',
  styleUrl: './solver.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolverComponent {
  private readonly solverService = inject(SolverService);

  readonly detectors = input.required<Detector<DetectorType[]>[]>();
  // CONSIDER: Try to get the detector types from the detectors input
  readonly detectorTypes = input.required<DetectorType[]>();
  readonly filter = input.required<Filter[]>();

  protected readonly solution: Signal<Solution<string> | undefined> =
    this.solverService.solution;

  // TODO: Option to not deplete any filter type
  private readonly constraints: Signal<Map<string, Constraint>> =
    this.solverService.constraints;

  protected readonly variables: Signal<Map<string, Coefficients>> =
    this.solverService.variables;

  private readonly solverEffect = effect(() => {
    this.solverService.detectors.set(this.detectors());
    this.solverService.detectorTypes.set(this.detectorTypes());
    this.solverService.filter.set(this.filter());
  });

  protected getDelta(variable: string): number {
    // CONSIDER: Design proper typing
    const coefficients = this.variables().get(variable);
    if (!coefficients || !isObject(coefficients)) {
      return Infinity;
    }
    return coefficients['delta'] ?? Infinity;
  }
}

const isObject = (o: unknown): o is Record<string, unknown> => {
  return typeof o === 'object' && o !== null;
};
