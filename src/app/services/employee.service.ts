import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http : HttpClient) { }

  // addEmployee(data : any) : Observable<any>{
  //   return this._http.post("http://localhost:3000/employees", data);
  // }

  addEmployee(data : any) : Observable<any>{
    return this._http.post("http://localhost:8080/api/employees", data);
  }

  // updateEmployee(id : number, data : any) : Observable<any>{
  //   return this._http.put(`http://localhost:3000/employees/${id}`, data)
  // }

  updateEmployee(id : number, data : any) : Observable<any>{
    return this._http.put(`http://localhost:8080/api/employees/${id}`, data)
  }

  // getEmployee(): Observable<any>{
  //   return this._http.get("http://localhost:3000/employees");
  // }

  getEmployee(): Observable<any>{
    return this._http.get("http://localhost:8080/api/employees");
  }

  // deleteEmployee(id : number) : Observable<any>{
  //   return this._http.delete(`http://localhost:3000/employees/${id}`)
  // }

  deleteEmployee(id : number) : Observable<any>{
    return this._http.delete(`http://localhost:8080/api/employees/${id}`)
  }


}
