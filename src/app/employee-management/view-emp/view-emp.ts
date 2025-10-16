import { Component,OnInit } from '@angular/core';
// import {Service} from '/Users/yogas/Project/Angular/Register-Employee/src/app/Service-Module/service'
import {Service} from '../../Service-Module/service'
import {Employee} from '../create-emp/Employee.Interface'

@Component({
  selector: 'app-view-emp',
  standalone: false,
  templateUrl: './view-emp.html',
  styleUrl: './view-emp.css'
})
export class ViewEmp implements OnInit{
  constructor(private service: Service) {}

  employee: Employee | any;
  getData() {
    this.employee = this.service.getData();
    console.log(this.employee[0]);
  }
  ngOnInit() {
    this.getData();
  }
}
