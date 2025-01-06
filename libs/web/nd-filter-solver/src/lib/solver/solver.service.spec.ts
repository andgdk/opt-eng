import { TestBed } from '@angular/core/testing';

import { SolverService } from './solver.service';

describe('SolverService', () => {
  let service: SolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolverService);
  });

  it('should calculate theoretical reading correctly', () => {
    const reading = 1000;
    const transmission = 50;

    const theoreticalReading = service['theoreticalReading'](
      reading,
      transmission
    );
    expect(theoreticalReading).toBe(500);
  });
  it('theoretical reading should be rounded up', () => {
    const reading = 1003;
    const transmission = 50;

    const theoreticalReading = service['theoreticalReading'](
      reading,
      transmission
    );
    expect(theoreticalReading).toBe(502);
  });
});
