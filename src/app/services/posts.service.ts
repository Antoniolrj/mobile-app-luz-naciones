import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-wp.service';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostsService extends BaseService {

  totalPosts: number | null = 0; 
  totalPages: number | null = 0;

  constructor(private http: HttpClient) {
    super();
  }

  getPosts(categoryId: number = environment.idCategoryPredicaciones, page: number = 1, pageSize: number = 5): Observable<any[] | null> {
    const url = `${this.baseUrl}posts?categories=${categoryId}&page=${page}&per_page=${pageSize}`;
  
    return this.http.get<any[]>(url, { observe: 'response' })
      .pipe(
        map(response => {
          console.log(response);
          const totalPostsHeader = response.headers.get('X-WP-Total');
          const totalPagesHeader = response.headers.get('X-WP-TotalPages');
          this.totalPosts = totalPostsHeader ? parseInt(totalPostsHeader, 10) : null;
          this.totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : null;
          return response.body;
        })
      );
  }

  getPost(postId: number): Observable<any> {
    const url = `${this.baseUrl}posts/${postId}`;

    return this.http.get<any>(url);
  }
}
