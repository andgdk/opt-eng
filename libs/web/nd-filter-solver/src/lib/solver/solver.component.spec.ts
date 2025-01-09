import type { Signal, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { SolverComponent } from './solver.component';
import type { Detector, Filter } from './solver.model';

describe('SolverComponent when inside a test host', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let resultEl: HTMLElement;
  let deltaEl1: HTMLElement;
  let deltaEl2: HTMLElement;
  let deltaEl3: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
  });
  beforeEach(async () => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture = TestBed.createComponent(TestHostComponent);

    await fixture.whenStable();

    resultEl = fixture.nativeElement.querySelector('[data-test-id="result"]');
    deltaEl1 = fixture.nativeElement.querySelector('[data-test-id="delta-1"]');
    deltaEl2 = fixture.nativeElement.querySelector('[data-test-id="delta-2"]');
    deltaEl3 = fixture.nativeElement.querySelector('[data-test-id="delta-3"]');
  });

  it.skip('should calculate the correct result', () => {
    expect(resultEl.textContent).toBe('175');
  });

  it.skip('should calculate delta correctly', () => {
    expect(deltaEl1.textContent).toBe('0');
    expect(deltaEl2.textContent).toBe('125');
    expect(deltaEl3.textContent).toBe('50');
  });
});
////// Test Host Component //////
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
  imports: [SolverComponent],
  template: `<nd-solver
    [detectors]="detectors()"
    [detectorTypes]="detectorTypes"
    [filter]="filter()"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  filter: Signal<Filter[]> = signal([
    { textLabel: 'T 0.1 %', transmission: 0.1, available: 3 },
    { textLabel: 'T 0.2 %', transmission: 0.2, available: 3 },
    { textLabel: 'T 0.5 %', transmission: 0.5, available: 3 },
    { textLabel: 'T 1.0 %', transmission: 1, available: 3 },
    { textLabel: 'T 2.0 %', transmission: 2, available: 3 },
    { textLabel: 'T 5.0 %', transmission: 5, available: 3 },
    { textLabel: 'T 10.0 %', transmission: 10, available: 3 },
    { textLabel: 'T 20.0 %', transmission: 20, available: 3 },
    { textLabel: 'T 50.0 %', transmission: 50, available: 6 },
  ]);

  // detectorTypes: DetectorType[] = [
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
  // detectors: WritableSignal<
  //   Detector<typeof this.detectorTypes>[]
  // > = signal([
  //   { type: 'typeC', textLabel: 'Camera 1' },
  //   { type: 'typeA', textLabel: 'Camera 2' },
  //   { type: 'typeB', textLabel: 'Photo Diode' },
  // ]);
  detectorTypes: ExampleDetectorTypes = [
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
  detectors: WritableSignal<Detector<ExampleDetectorTypes>[]> = signal([
    { type: 'typeA', textLabel: 'Camera 1' },
    { type: 'typeA', textLabel: 'Camera 2' },
    { type: 'typeB', textLabel: 'Photo Diode' },
  ]);

  addCamera(): void {
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
}
