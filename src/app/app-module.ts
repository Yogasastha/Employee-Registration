import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Dashboard } from './dashboard/dashboard';
import { EmployeeManagement } from './employee-management/employee-management';
import { CreateEmp } from './employee-management/create-emp/create-emp';
import { ViewEmp } from './employee-management/view-emp/view-emp';
import { Sidebar } from './sidebar/sidebar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {NgFor, CommonModule } from '@angular/common';

@NgModule({
  declarations: [App, Dashboard, EmployeeManagement, CreateEmp, ViewEmp, Sidebar],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,NgFor,CommonModule ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
