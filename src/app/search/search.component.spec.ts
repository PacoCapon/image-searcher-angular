import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchComponent } from './search.component';
import { UnsplashService } from '../unsplash.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let unsplashService: UnsplashService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ UnsplashService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    unsplashService = TestBed.inject(UnsplashService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for images', () => {
    const query = 'test';
    const searchResults = { results: [{ id: '1', urls: { small: 'url' }, alt_description: 'desc' }] };

    spyOn(unsplashService, 'searchImages').and.returnValue(of(searchResults));

    component.query = query;
    component.search();

    expect(component.images.length).toBe(1);
    expect(component.images[0].id).toBe('1');
  });

  it('should load more images', () => {
    const query = 'test';
    const searchResults = { results: [{ id: '1', urls: { small: 'url' }, alt_description: 'desc' }] };

    spyOn(unsplashService, 'searchImages').and.returnValue(of(searchResults));

    component.query = query;
    component.loadMore();

    expect(component.images.length).toBe(1);
    expect(component.images[0].id).toBe('1');
    expect(component.page).toBe(2);
  });

  it('should toggle dark mode', () => {
    component.isDarkMode = false;
    component.toggleDarkMode();
    expect(component.isDarkMode).toBeTrue();

    component.toggleDarkMode();
    expect(component.isDarkMode).toBeFalse();
  });
});
