import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const WAREHOUSE_API = "http://localhost:8080/api/warehouse/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  getLists():Observable<any>{
    return this.http.get(WAREHOUSE_API,httpOptions);
  }
}
