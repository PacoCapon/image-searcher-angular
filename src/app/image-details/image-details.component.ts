import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsplashService } from '../unsplash.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent implements OnInit {
  image: any;

  constructor(
    private route: ActivatedRoute,
    private unsplashService: UnsplashService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const imageId = params.get('id');
      if (imageId) {
        this.unsplashService.getImageDetails(imageId).subscribe(response => {
          this.image = response;
        });
      }
    });
  }
}
