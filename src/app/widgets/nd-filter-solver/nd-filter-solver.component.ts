/* SPDX-License-Identifier: MIT */
/* Copyright © 2024-2025 Andreas Gödecke */

import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { SolverComponent } from 'nd-filter-solver';

import type { Detector, Filter } from 'nd-filter-solver';

type ExampleDetectorTypes = [
  {
    typeId: 'typeA';
    textLabel: 'CCD';
    targetReadingMin: 2800;
    targetReadingMax: 3200;
  },
  {
    typeId: 'typeB';
    textLabel: 'Pyroelectric';
    targetReadingMin: 200;
    targetReadingMax: 500;
  }
];

@Component({
  selector: 'opt-eng-nd-filter-solver',
  imports: [SolverComponent],
  templateUrl: './nd-filter-solver.component.html',
  styleUrl: './nd-filter-solver.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NdFilterSolverComponent {
  protected readonly filter: Signal<Filter[]> = signal([
    { textLabel: 'T 0.1 %', transmission: 0.1, available: 2 },
    { textLabel: 'T 0.2 %', transmission: 0.2, available: 2 },
    { textLabel: 'T 0.5 %', transmission: 0.5, available: 2 },
    { textLabel: 'T 1.0 %', transmission: 1, available: 2 },
    { textLabel: 'T 2.0 %', transmission: 2, available: 2 },
    { textLabel: 'T 5.0 %', transmission: 5, available: 2 },
    { textLabel: 'T 10.0 %', transmission: 10, available: 2 },
    { textLabel: 'T 20.0 %', transmission: 20, available: 2 },
    { textLabel: 'T 50.0 %', transmission: 50, available: 4 },
  ]);

  // protected readonly detectorTypes: DetectorType[] = [
  //   {
  //     typeId: 'typeA' as const,
  //     textLabel: 'CCD',
  //     targetReadingMin: 2800,
  //     targetReadingMax: 3200,
  //   } as const,
  //   {
  //     typeId: 'typeB' as const,
  //     textLabel: 'Pyroelectric',
  //     targetReadingMin: 200,
  //     targetReadingMax: 500,
  //   } as const,
  // ] as const;
  // protected readonly detectors: WritableSignal<
  //   Detector<typeof this.detectorTypes>[]
  // > = signal([
  //   { type: 'typeC', textLabel: 'Camera 1' },
  //   { type: 'typeA', textLabel: 'Camera 2' },
  //   { type: 'typeB', textLabel: 'Photo Diode' },
  // ]);
  protected readonly detectorTypes: ExampleDetectorTypes = [
    {
      typeId: 'typeA',
      textLabel: 'CCD',
      targetReadingMin: 2800,
      targetReadingMax: 3200,
    },
    {
      typeId: 'typeB',
      textLabel: 'Pyroelectric',
      targetReadingMin: 200,
      targetReadingMax: 500,
    },
  ] as const;
  protected readonly detectors: WritableSignal<
    Detector<ExampleDetectorTypes>[]
  > = signal([
    { type: 'typeA', textLabel: 'Camera 1' },
    { type: 'typeA', textLabel: 'Camera 2' },
    { type: 'typeB', textLabel: 'Photo Diode' },
  ]);

  protected addDetector(): void {
    this.detectors.update((detectors) => [
      ...detectors,
      {
        type: 'typeA',
        textLabel: `Camera ${
          detectors.filter((d) => d.type === 'typeA').length + 1
        }`,
      },
    ]);
  }
  protected removeDetector(): void {
    this.detectors.update((detectors) =>
      detectors.slice(0, detectors.length - 1)
    );
  }
}
