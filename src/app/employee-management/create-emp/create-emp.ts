import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Employee } from '../create-emp/Employee.Interface';
import { Service } from '../../Service-Module/service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-emp',
  standalone: false,
  templateUrl: './create-emp.html',
  styleUrls: ['./create-emp.css'],
})
export class CreateEmp implements OnInit {
  createForm: FormGroup | any;
  employee: Employee | any;
  editId: string | any = '';
  minDate = '1990-05-15';
  maxDate = '2006-12-01';

  constructor(
    private fb: FormBuilder,
    private service: Service,
    private paramsAccess: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    // this.editId = this.paramsAccess.snapshot.paramMap.get('id');
    console.log(this.editId);
    this.paramsAccess.params.subscribe((res) => {
      this.editId = res['id'];
      this.loadFormData(this.editId);
    });

    // this.editId = this.route.snapshot.paramMap.get('id');

    this.service.getData().subscribe((employees: Employee[]) => {
      this.service.updateLastId(employees);
    });

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

  formatDate(date: string): string {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  }
  formatChangeTo(date: Date) {
    const isoDateObject = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds()
      )
    );
    return isoDateObject;
  }

  loadFormData(editId: string) {
    this.service.getUserById(editId).subscribe((res) => {
      res.date = this.formatChangeTo(new Date(res.date));
      this.createForm.patchValue(res);
    });
  }

  generateId(): string {
    return this.service.getNextId();
  }

  create() {
    this.employee = this.createForm.value;
    this.employee.date = this.formatDate(this.employee.date);
    this.employee.id = this.generateId();
    if (this.editId) {
      this.updateRecord(this.editId, this.createForm.value);
      this.editId = '';
      this.reloadData();
      this.route.navigate(['employee-management/view']);
    } else {
      this.service.postData(this.employee);
      this.createForm.reset();
      this.reloadData();
    }
  }

  reloadData() {
    this.service.getData().subscribe((employees: Employee[]) => {
      this.service.updateLastId(employees);
    });
  }
  updateRecord(id: number, updatedData: any) {
    this.service.updateData(id, updatedData).subscribe((response) => {
      if (response) {
        console.log('Data updated successfully:', response);
      } else {
        console.log('Failed to update data');
      }
    });
  }

  formatText(event: KeyboardEvent) {
    const key = event.key;
    if (/[a-zA-Z ]/.test(key)) {
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

  minLength(controlName: string, errorCode: string): any {
    if (errorCode == 'minlength') {
      var actualLength = this.createForm.controls[controlName]?.errors?.[errorCode]?.actualLength;
      var requiredLength =
        this.createForm.controls[controlName]?.errors?.[errorCode]?.requiredLength;
      return actualLength < requiredLength;
    } else {
      return this.createForm.controls[controlName]?.errors?.[errorCode];
    }
  }

  getError(controlName: string, errorCode: string): any {
    return this.createForm.controls[controlName]?.errors?.[errorCode];
  }

  isInvalidandTouched(value: string): boolean {
    const control = this.createForm.get(value);
    return control && control.invalid && control.touched;
  }

  display() {
    return this.createForm.value;
  }
}
