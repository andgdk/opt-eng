import type { Signal } from '@angular/core';
import { computed, effect, Injectable, signal, untracked } from '@angular/core';

import type { Coefficients, Constraint, Model, Solution } from 'yalps';
import { equalTo, inRange, solve } from 'yalps';

import type { Detector, DetectorType, Filter } from './solver.model';

@Injectable({
  providedIn: 'root',
})
export class SolverService {
  public readonly detectors = signal<Detector<DetectorType[]>[]>([]);
  // CONSIDER: Try to get the detector types from the detectors signal
  public readonly detectorTypes = signal<DetectorType[]>([]);
  public readonly filter = signal<Filter[]>([]);

  private readonly tempReading: Signal<number[]> = computed(() => {
    return this.detectors().map((detector) => {
      const baseValue = detector.type === 'typeA' ? 6000 : 40000;
      return (
        baseValue +
        Math.floor(Math.random() * baseValue * 0.04) -
        baseValue * 0.02
      );
    });
  });

  public readonly solution: Signal<Solution<string>> = computed(() => {
    // solve(this.model, { includeZeroVariables: true });
    return solve(this.model());
  });

  // TODO: Option to not deplete any filter type
  public readonly constraints: Signal<Map<string, Constraint>> = computed(
    () => {
      const constraints = new Map<string, Constraint>();
      // TODO: Accept 1 or more filters per detector
      this.detectors().forEach((detector, i) => {
        // Ensure every detector (D) only receives one ND filter
        constraints.set(`D${i + 1}`, equalTo(1));
        // Limit valid options by range of readings
        // N.B. The key must include information about the detector and its type, the type alone does not suffice. This is because the same detector type can be used multiple times.
        const detectorType = this.detectorTypes().find(
          (detectorType) => detectorType.typeId === detector.type
        );
        constraints.set(
          `D${i + 1}R${detector.type}`,
          detectorType
            ? inRange(
                detectorType.targetReadingMin,
                detectorType.targetReadingMax
              )
            : inRange(0, Infinity)
        );
      });
      // Limit number of available ND filters (F) by type
      // CONSIDER: Automatically add 100 % transmission, controllably by boolean input
      this.filter().forEach((filter) =>
        constraints.set(`F${filter.transmission}`, inRange(0, filter.available))
      );
      return constraints;
    }
  );

  public readonly variables: Signal<Map<string, Coefficients>> = computed(
    () => {
      const variables = new Map<string, Coefficients>();
      this.detectors().forEach((detector, i) =>
        this.filter().forEach((filter) => {
          variables.set(`D${i + 1} ${filter.transmission} %`, {
            [`D${i + 1}`]: 1,
            [`F${filter.transmission}`]: 1,
            [`D${i + 1}R${detector.type}`]: this.theoreticalReading(
              this.tempReading()[i],
              filter.transmission
            ),
            delta: this.calculateDelta(
              detector.type,
              this.theoreticalReading(
                this.tempReading()[i],
                filter.transmission
              )
            ),
          });
        })
      );
      return variables;
    }
  );

  private readonly model: Signal<Model> = computed(() => {
    return {
      direction: 'minimize' as const,
      objective: 'delta' as const,
      constraints: this.constraints(),
      variables: this.variables(),
      integers: true, // all variables are indicated as integer
      // binaries: new Set(['D1F0.1']),
    };
  });

  private readonly solveEffect = effect(() => {
    this.solution();
    untracked(() =>
      console.debug('Model', this.model(), 'Solutions', this.solution())
    );
  });

  private calculateDelta(
    detectorId: DetectorType['typeId'],
    detectorReading: number
  ): number {
    const detector = this.detectorTypes().find(
      (detectorType) => detectorType.typeId === detectorId
    );
    return detector
      ? Math.round(
          Math.abs(
            detectorReading -
              (detector.targetReadingMin +
                (detector.targetReadingMax - detector.targetReadingMin) / 2)
          )
        )
      : Infinity;
  }
  private theoreticalReading(reading: number, transmission: number): number {
    return Math.round(reading * transmission * 1e-2);
  }
}
