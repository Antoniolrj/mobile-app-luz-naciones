import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-wp.service';


@Injectable({
  providedIn: 'root'
})
export class MenusService extends BaseService {
  
  constructor(private http: HttpClient) {
    super();
  }

  getMenus(): Observable<any[]> {
    const menuEndpoint = `${this.baseUrl}menus`;

    return this.http.get<any[]>(menuEndpoint, { headers: this.headers });
  }

  getMainMenu(): Observable<any> {
    return this.getMenus().pipe(
      map((menus) => menus.find((menu) => menu.locations.includes('primary-menu')))
    );
  }

  getMenuItems(id: number): Observable<any> {
    const menuEndpoint = `${this.baseUrl}menu-items?menus=${id}`;

    return this.http.get<any[]>(menuEndpoint, { headers: this.headers }).pipe(
      map(items => items.filter(item => item.status === 'publish')));  
  }
}
