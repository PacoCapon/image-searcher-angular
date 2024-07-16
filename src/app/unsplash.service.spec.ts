import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UnsplashService } from './unsplash.service';

describe('UnsplashService', () => {
  let service: UnsplashService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UnsplashService ]
    });

    service = TestBed.inject(UnsplashService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search images', () => {
    const query = 'test';
    const response = { results: [{ id: '1', urls: { small: 'url' }, alt_description: 'desc' }] };

    service.searchImages(query, 1).subscribe((data) => {
      expect(data).toEqual(response);
    });

    const req = httpMock.expectOne(req => req.url.includes('/search/photos') && req.params.has('query') && req.params.get('query') === 'test' && req.params.has('page') && req.params.get('page') === '1');
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should get image details', () => {
    const imageId = '1';
    const response = { id: '1', urls: { regular: 'url' }, description: 'desc', user: { name: 'author' }, likes: 100 };

    service.getImageDetails(imageId).subscribe((data) => {
      expect(data).toEqual(response);
    });

    const req = httpMock.expectOne(`https://api.unsplash.com/photos/1`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
