import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SolverComponent } from 'nd-filter-solver';

@Component({
  imports: [RouterModule, SolverComponent],
  selector: 'opt-eng-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
