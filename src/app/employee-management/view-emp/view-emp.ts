import { Service } from '../../Service-Module/service';
import { Employee } from '../create-emp/Employee.Interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-emp',
  standalone: false,
  templateUrl: './view-emp.html',
  styleUrl: './view-emp.css',
})
export class ViewEmp implements OnInit {
  dataNotFound: boolean = false;
  searchQuery: string = '';
  faDelete = faTrash;
  faEdit = faUserEdit;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'date',
    'gender',
    'department',
    'phoneNumber',
    'Action',
  ];

  dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private service: Service, private route: Router) {}

  ngOnInit() {
    this.service.getData().subscribe((employees: Employee[]) => {
      this.dataSource.data = employees;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onEdit(employee: Employee) {
    console.log('clicked');
    this.route.navigate(['/employee-management/create', employee]);
  }
  onDelete(employeeId: string) {
    alert("Employee deleted successfully");
    this.service.deleteEmployee(employeeId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((emp) => emp.id !== employeeId);
    });
  }

  searchFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.filteredData.length == 0) {
      this.dataNotFound = true;
    } else {
      this.dataNotFound = false;
    }
  }

  downloadPDF() {
    const doc = new jsPDF();

    const tableData = this.dataSource.filteredData.map((employee) => [
      employee.id,
      employee.firstName,
      employee.lastName,
      new Date(employee.date).toLocaleDateString(),
      employee.gender,
      employee.department,
      employee.phoneNumber,
    ]);
    if (tableData.length == 0) {
      this.dataNotFound = false;
    }

    const columnHeading = [
      'ID',
      'First Name',
      'Last Name',
      'Date of Birth',
      'Gender',
      'Department',
      'Phone Number',
    ];

    autoTable(doc, {
      head: [columnHeading],
      body: tableData,
    });

    doc.save('employee-list.pdf');
  }
}
