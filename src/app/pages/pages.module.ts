import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { ProcessDetailComponent } from './process-detail/process-detail.component';
import { GraphComponent } from './graph/graph.component';
import { DelegateToComponent } from './delegate-to/delegate-to.component';
import { AddNodeComponent } from './graph/add-node/add-node.component';
import { ResourceCostsComponent } from './resource-costs/resource-costs.component';
import { EmailHeaderComponent } from './header/email-header/email-header.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
  ],
  declarations: [
    PagesComponent,
    HeaderComponent,
    DashboardComponent,
    SettingsComponent,
    ProcessDetailComponent,
    GraphComponent,
    DelegateToComponent,
    AddNodeComponent,
    ResourceCostsComponent,
    EmailHeaderComponent,
  ],
  entryComponents: [
    AddNodeComponent
  ]
})
export class PagesModule { }