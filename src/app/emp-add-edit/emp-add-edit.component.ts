import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  education : string[] =[
    "matrix",
    "Diploma",
    "Graduation",
    "Post Graduation",
    "Research Scholar"
  ]

  empForm : FormGroup;

  constructor(
    private _fb : FormBuilder,
    private _empService : EmployeeService,
    private _dialogRef : MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA)  public data : any,
    private _coreService : CoreService,
    private datePipe : DatePipe
    ){
    this.empForm = this._fb.group({
      firstName : "",
      lastName : "",
      email : "",
      dob : "",
      gender : "",
      education : "",
      company : "",
      packageAmount : "",
      experience : ""
    })
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){

      let formData = { ...this.empForm.value };
      if (formData.dob) {
        // Format date to YYYY-MM-DD
        formData.dob = this.datePipe.transform(formData.dob, 'yyyy-MM-dd');
      }

      if(this.data){
        this._empService.updateEmployee(this.data.id, formData).subscribe({
          next: (val : any) =>{
            // alert("Employee Updated");
            this._coreService.openSnackBar("Employee Updated ", "Done");
            this._dialogRef.close(true);
          },
          error: (err : any) =>{
            console.error(err);
          }
        })
      }
      else{
        this._empService.addEmployee(formData).subscribe({
          next: (val : any) =>{
            // alert("Employee added succesfully ");
            this._coreService.openSnackBar("Employee added succesfully ", "Done");
            this._dialogRef.close(true);
          },
          error: (err : any) =>{
            console.error(err);
          }
        })
      }
    }
  }


}
