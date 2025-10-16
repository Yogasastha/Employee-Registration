import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {Employee} from '../create-emp/Employee.Interface'
import {Service} from '../../Service-Module/service'

@Component({
  selector: 'app-create-emp',
  standalone: false,
  templateUrl: './create-emp.html',
  styleUrl: './create-emp.css',
})
export class CreateEmp implements OnInit {
  createForm: FormGroup | any;
  employee: Employee | any;
  id: number = 0; 
  empId: string = 'E00';
  minDate = '1990-05-15'
  maxDate = '2006-12-01';
  constructor(private fb: FormBuilder, private service: Service) {}


  getLastData() {
    // *ngFor = 
  }
  generateId() :string{
    this.id = this.id+1;
    return this.empId + '' + (this.id);
  }
  ngOnInit() {
    this.createForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z]+(?: [A-Za-z]+)*$'),
        ],
      ],
      lastName: ['', Validators.required],
      middleName: [''],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  create() {
    this.employee = this.createForm.value;
    this.employee.id = this.generateId();
    this.employee.
    this.service.postData(this.employee);
    this.createForm.reset();
  }

  formatText(event: KeyboardEvent) {
    const key = event.key;
    if (/[a-zA-z ]/.test(key)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


    formatPhoneNumber(event: any) {
    const e = event.target as HTMLInputElement;
    let value = e.value ?? '';
    value = value.replace(/\D/g, '');

    if (value.length > 3 && value.length <= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }

    this.setValue('phoneNumber').setValue(value);
  }
    setValue(controlName: string) {
    return this.createForm.controls[controlName];
  }
  // getError(value: string, error :string) :boolean{
  //   // return this.signUpForm.controls[controlName]?.errors?.[errorCode];
  //   return this.createForm.controls[value]?.errors?.[error];
  // }

  minLength(controlName: string, errorCode: string): any {
    console.log(this.createForm.controls.firstName);
    if(errorCode =='minlength'){
      var actualLength =  this.createForm.controls[controlName]?.errors?.[errorCode]?.actualLength;
      var requiredLength = this.createForm.controls[controlName]?.errors?.[errorCode]?.requiredLength;
      if(actualLength < requiredLength){
        return true;  
      }else{
        return false
      }
    }else{
      return this.createForm.controls[controlName]?.errors?.[errorCode];
    }
  }


  
  getError(controlName: string, errorCode: string): any {
    
    return this.createForm.controls[controlName]?.errors?.[errorCode];
  }

  isInvalidandTouched(value: string): boolean {
    const control = this.createForm.get(value);
    // console.log("hi")
    // console.log(control.touched);
    return control && control.invalid && control.touched;
  }

  display() {
    return this.createForm.value;
  }
}
// const control = new FormControl('ng', Validators.minLength(3));

// console.log(control.errors);