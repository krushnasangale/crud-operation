import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDashModel } from '../home/employee.model';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {


  formValue !: FormGroup;
  employeeAll:any;

  
  employeeModelObj: EmployeeDashModel = new EmployeeDashModel();
  constructor(private formBuilder : FormBuilder, private api: ApiService, private toastr:ToastrService) { }

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

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeAll = res;
    })
  }

  deleteEmployee(data:any){
    this.api.deleteEmployee(data.id)
    .subscribe(res=>{
      this.toastr.error("Employee Deleted Successfully !!");
      this.getAllEmployee();
    })
  }

  editEmployee(data:any){

    this.employeeModelObj.id = data.id;
    this.formValue.controls['avatar'].setValue(data.avatar);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['dateOfBirth'].setValue(data.dateOfBirth);
    this.formValue.controls['country'].setValue(data.country);
  }


  updateEmployee(){
    this.employeeModelObj.avatar= this.formValue.value.avatar;
    this.employeeModelObj.name= this.formValue.value.name;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.dateOfBirth= this.formValue.value.dateOfBirth;
    this.employeeModelObj.country= this.formValue.value.country;

    this.api.updateEmployeeRecords(this.employeeModelObj).subscribe(res=>{

      console.log(res);
      this.toastr.success("Record Updated Successfully !!");
      this.formValue.reset();
      let ref = document.getElementById('exampleModal');
      ref?.click();
      this.getAllEmployee();
    })
  }


}
