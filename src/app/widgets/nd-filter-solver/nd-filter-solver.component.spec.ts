import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NdFilterSolverComponent } from './nd-filter-solver.component';

describe('NdFilterSolverComponent', () => {
  let component: NdFilterSolverComponent;
  let fixture: ComponentFixture<NdFilterSolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NdFilterSolverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NdFilterSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
