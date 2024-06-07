import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { IonContent } from '@ionic/angular';
import { PostComponent } from '../post/post.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  rootPage = PostComponent;
  @ViewChild('postContainer') postContainer: IonContent | undefined;

  pageTitle!: string;
  private activatedRoute = inject(ActivatedRoute);

  posts: any[] | null = [];
  totalPosts: any;
  totalPages: any;
  currentPage: number = 1;

  categories: any[] = [];
  selectedCategoryId: number = environment.idCategoryPredicaciones;
  
  loadingPosts: boolean = true;
  postLoaded: boolean = false;

  constructor(private postService: PostsService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.pageTitle = this.pageTitle = this.activatedRoute.snapshot.url[0]?.path.toUpperCase() as string;
    this.getCategories();
    this.getPost();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getPost() {

    this.postLoaded = false;
    this.loadingPosts = true;

    this.postService.getPosts(this.selectedCategoryId).subscribe({
      next: (data) => {
        this.posts = data;
        this.totalPosts = this.postService.totalPosts;
        this.totalPages = this.postService.totalPages;

        this.postLoaded = true;
        this.loadingPosts = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  loadMorePosts(event: any) {
    this.currentPage++;
    
    if(this.currentPage <= this.totalPages) {
      this.postService.getPosts(environment.idCategoryPredicaciones, this.currentPage).subscribe({
        next: (data) => {
          // Concatena nuevos posts a la lista existente
          this.posts = (this.posts ?? []).concat(data);
          this.totalPosts = this.postService.totalPosts;
          this.totalPages = this.postService.totalPages; 

          // Verifica si se han cargado todos los posts
          if (this.posts?.length >= this.totalPosts) {
            event.target.disabled = true;
  
            setTimeout(() => {
              event.target.disabled = false;
            }, 100);
          }
    
          event.target.complete();
        },
        error: (error) => {
          console.log(error);
    
          // Deshabilita el scroll infinito en caso de error o página no válida
          event.target.disabled = true;
          setTimeout(() => {
            event.target.disabled = false;
          }, 100);
        },
      });
    } else {
      event.target.disabled = true;
      setTimeout(() => {
        event.target.disabled = false;
      }, 100);
    }
  }
  
  onCategoryChange(event: any) {
    this.selectedCategoryId = event.detail.value;
    this.currentPage = 1;
    this.getPost();
    this.scrollToTop();
  }

  scrollToTop() {
    if (this.postContainer) {
      this.postContainer.scrollToTop(50);
    }  
  }
}
