import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProcessDetailComponent } from './pages/process-detail/process-detail.component';
import { GraphComponent } from './pages/graph/graph.component';
import { DelegateToComponent } from './pages/delegate-to/delegate-to.component';
import { ResourceCostsComponent } from './pages/resource-costs/resource-costs.component';
import { AnalyticsModule } from './analytics/analytics.module';
import { SettingsComponent } from './pages/settings/settings.component';


const appRoutes: Routes = [
  {path: '', component: PagesComponent, /*canActivate: [AuthGuard],*/
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'process-detail/:id', component: ProcessDetailComponent },
      { path: 'graph', component: GraphComponent },
      { path: 'delegate-to', component: DelegateToComponent },
      { path: 'resource-costs/:id', component: ResourceCostsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)}
    ]
  },
  { path: 'login', component: AuthComponent, pathMatch: 'full' },
  { path: 'admin-login', component: AdminAuthComponent, pathMatch: 'full'},
  { path: '**', component: AuthComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}