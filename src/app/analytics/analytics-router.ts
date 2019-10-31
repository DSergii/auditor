import { Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { AuditStatusComponent } from './audit-status/audit-status.component';
import { ProcessBreakdownComponent } from './process-breakdown/process-breakdown.component';
import { RpaAnalyzerComponent } from './rpa-analyzer/rpa-analyzer.component';


export const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
    children: [
      {
        path: 'audit-status', component: AuditStatusComponent
      },{
        path: 'process-breakdown', component: ProcessBreakdownComponent
      }, {
        path: 'rpa-analyzer', component: RpaAnalyzerComponent
      }
    ]
  }
];