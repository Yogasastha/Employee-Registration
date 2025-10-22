import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { CreateEmp } from './employee-management/create-emp/create-emp';
import { ViewEmp } from './employee-management/view-emp/view-emp';
import { EmployeeManagement } from './employee-management/employee-management';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  {
    path: 'employee-management',
    component: EmployeeManagement,
    children: [
      { path: 'create', component: CreateEmp },
      { path: 'view', component: ViewEmp },
    ],
  },
  { path: 'employee-management/create/:id', component: CreateEmp },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
