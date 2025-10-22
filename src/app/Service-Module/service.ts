import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee-management/create-emp/Employee.Interface';

@Injectable({
  providedIn: 'root',
})
export class Service {
  lastId: string = '';

  constructor(private service: HttpClient) {}
  baseUrl = 'http://localhost:3000/employees';
  employee: Employee | any;

  updateLastId(employees: Employee[]) {
    if (employees && employees.length > 0) {
      const lastEmployee = employees[employees.length - 1];
      this.lastId = lastEmployee.id;
    }
    //
    return this.lastId;
  }
  //
  getLastId(): string {
    return this.lastId;
  }

  getNextId(): string {
    const prefix = this.lastId.slice(0, 1);
    const numericPart = parseInt(this.lastId.slice(1));
    console.log(numericPart);
    const nextNumericPart = (numericPart + 1).toString().padStart(3, '0');
    return `${prefix}${nextNumericPart}`;
  }

  getData(): Observable<Employee[]> {
    return this.service.get<Employee[]>(this.baseUrl);
  }
  postData(data: Employee) {
    return this.service.post(this.baseUrl, data).subscribe((res) => {
      return res;
    });
  }
  getUserById(id: string) {
    const patchId = `${this.baseUrl}/${id}`;
    return this.service.get<Employee>(patchId);
  }

  updateData(id: number, updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.service.patch(url, updatedData);
  }

  deleteEmployee(employeeId: string): Observable<void> {
    return this.service.delete<void>(`${this.baseUrl}/${employeeId}`);
  }
}
