import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthComponent } from './admin-auth.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AdminAuthComponent,
    LoginComponent
  ]
})
export class AdminAuthModule { }
