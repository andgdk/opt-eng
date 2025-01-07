import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NdFilterSolverComponent } from './nd-filter-solver.component';

describe('NdFilterSolverComponent', () => {
  let component: NdFilterSolverComponent;
  let fixture: ComponentFixture<NdFilterSolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NdFilterSolverComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(NdFilterSolverComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should add a new detector of type "typeA" when addDetector is called', async () => {
    const initialLength = component['detectors']().length;
    component['addDetector']();
    await fixture.whenStable();

    const updatedLength = component['detectors']().length;
    expect(updatedLength).toBe(initialLength + 1);
    expect(component['detectors']()[updatedLength - 1].type).toBe('typeA');
    expect(component['detectors']()[updatedLength - 1].textLabel).toBe(
      `Camera ${initialLength}` // There is one detector of typeB, causing the index to be off by one
    );

    const deltaElements = fixture.debugElement.queryAll(
      By.css('[data-test-id^="delta-"]')
    );
    expect(deltaElements).toBeTruthy();
    expect(deltaElements.length).toBe(updatedLength);
  });
});
