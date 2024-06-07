import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent  implements OnInit {

  postId: any; // Almacena el ID del post
  postDetails: any; // Almacena los detalles del post

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) { }

  ngOnInit() {
    // Obtén el ID del post de la ruta
    this.route.params.subscribe((params) => {
      this.postId = +params['id']; // 'id' debe coincidir con el nombre especificado en las rutas
      // Luego, utiliza el ID para cargar los detalles del post
      console.log(this.postId);
      this.loadPostDetails();
    });
  }

  loadPostDetails() {
    this.postService.getPost(this.postId).subscribe((response) => {
      console.log(response)
      this.postDetails = response;
    });
  }

}
