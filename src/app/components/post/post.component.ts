import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostDetailsComponent } from '../post-details/post-details.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {

  @Input() public title: any;
  @Input() public author: any;
  @Input() public date: any;
  @Input() public category: any;
  @Input() public image: any;
  @Input() public content: any;
  @Input() public id: any;

  component = PostDetailsComponent;

  constructor() { }

  ngOnInit() {
  }

  formatDate(dateString: string) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new DatePipe('es').transform(date, 'fullDate');
  }
}
