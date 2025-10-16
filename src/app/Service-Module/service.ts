import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employee} from '../employee-management/create-emp/Employee.Interface'

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private service: HttpClient) {}
  baseUrl = "http://localhost:3000/employees";
  employee: Employee | any;

  getData(): Observable<Employee> {
    this.employee = this.service.get(this.baseUrl).subscribe((res) => {
      console.log(res)
    });
    return this.employee;
  }
  postData(data: Employee) {
    return this.service.post(this.baseUrl, data).subscribe((res) =>{
      // this.getData();
      return res;
    });
  }
}
