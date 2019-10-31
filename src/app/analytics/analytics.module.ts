import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { SharedModule } from '../shared/shared.module';
import { AuditStatusComponent } from './audit-status/audit-status.component';
import { RouterModule } from '@angular/router';
import { routes } from './analytics-router';
import { ProcessBreakdownComponent } from './process-breakdown/process-breakdown.component';
import { RpaAnalyzerComponent } from './rpa-analyzer/rpa-analyzer.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AnalyticsComponent,
    AuditStatusComponent,
    ProcessBreakdownComponent,
    RpaAnalyzerComponent
  ],
})
export class AnalyticsModule { }
