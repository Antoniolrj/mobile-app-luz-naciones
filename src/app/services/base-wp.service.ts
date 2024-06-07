import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  
  protected baseUrl = environment.baseUrlWp;
  private base64Credentials = btoa(`${environment.userApi}:${environment.passwordApi}`);
  protected headers: HttpHeaders;

  constructor() {
    this.headers = new HttpHeaders({
      Authorization: `Basic ${this.base64Credentials}`,
      'Content-Type': 'application/json'
    });
  }

}
