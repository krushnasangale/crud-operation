import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeDashModel } from './employee.model';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeDashModel = new EmployeeDashModel();
  employeeAll:any;
  

  constructor(public toastr: ToastrService, private formBuilder : FormBuilder, private api: ApiService) { }
  

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id:[''],
      avatar:[''],
      name:[''],
      email:[''],
      dateOfBirth: [''],
      country:['']
    })
    this.getAllEmployee();
  }


  postEmployeeDetails(){
    this.employeeModelObj.id= this.formValue.value.id;
    this.employeeModelObj.avatar= this.formValue.value.avatar;
    this.employeeModelObj.name= this.formValue.value.name;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.dateOfBirth= this.formValue.value.dateOfBirth;
    this.employeeModelObj.country= this.formValue.value.country;

    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      console.log(res);

      this.toastr.success("employee Added Successfully !!");

      let ref = document.getElementById('exampleModal');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      this.toastr.warning("Something went Wrong !!");
    })
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeAll = res;
    })
  }

}
