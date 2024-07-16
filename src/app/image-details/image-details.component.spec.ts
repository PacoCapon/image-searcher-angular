import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ImageDetailsComponent } from './image-details.component';
import { UnsplashService } from '../unsplash.service';

describe('ImageDetailsComponent', () => {
  let component: ImageDetailsComponent;
  let fixture: ComponentFixture<ImageDetailsComponent>;
  let unsplashService: UnsplashService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDetailsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1'
            })
          }
        },
        UnsplashService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetailsComponent);
    component = fixture.componentInstance;
    unsplashService = TestBed.inject(UnsplashService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load image details', () => {
    const imageDetails = { id: '1', urls: { regular: 'url' }, description: 'desc', user: { name: 'author' }, likes: 100 };
    spyOn(unsplashService, 'getImageDetails').and.returnValue(of(imageDetails));

    component.ngOnInit();

    expect(component.image).toEqual(imageDetails);
  });
});
