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
import { Router } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgFor, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Footer } from './Footer/footer/footer';

@NgModule({
  declarations: [App, Dashboard, EmployeeManagement, CreateEmp, ViewEmp, Sidebar, Footer],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgFor,
    CommonModule,
    MatFormFieldModule,
    MatSortModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatTableModule,
    MatPaginator,
    FormsModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
