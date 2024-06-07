import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-wp.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getCategories(page: number = 1, pageSize: number = 50): Observable<any[]> {
    const url = `${this.baseUrl}categories?page=${page}&per_page=${pageSize}`;
    return this.http.get<any[]>(url);
  }

  getCategory(categoryId: number) {
    const url = `${this.baseUrl}categories/${categoryId}`;
    return this.http.get<any>(url);
  }
}
