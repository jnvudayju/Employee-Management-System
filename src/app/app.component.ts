import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-app';

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'education', 'company', 'experience', 'email', 'dob', 'packageAmount', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog : MatDialog,
    private _empService : EmployeeService,
    private _coreService : CoreService
    ){
  }

  ngOnInit(): void {
      this.getEmployeeList();
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next : (val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList(){
    this._empService.getEmployee().subscribe({
      next : (res)=>{
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error : (err)=>{
        console.log(err);
        
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id : number){
    console.log("Deleting employee with ID:", id);
    this._empService.deleteEmployee(id).subscribe({
      next : (res)=>{
        // alert("Employee deleted ");
        this._coreService.openSnackBar("Employee deleted ", "Done");
        // this.getEmployeeList();
        this.dataSource.data = this.dataSource.data.filter(employee => employee.id !== id);
        console.log("Updated dataSource:", this.dataSource.data);
      },
      error : (err)=>{
        console.log(err);
        
      }
    })
  }

  openEditEmpForm(data : any){
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data : data
    });

    dialogRef.afterClosed().subscribe({
      next : (val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })

  }

}
