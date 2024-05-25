import { Component } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div *ngIf="isLoading$ | async" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  isLoading$ = this.loadingService.loading$;
  
  constructor(private loadingService: LoadingService) {}
}
