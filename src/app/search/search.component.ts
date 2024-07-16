import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UnsplashService } from '../unsplash.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query = '';
  images: any[] = [];
  page = 1;
  isDarkMode = false;
  noResults = false;

  constructor(private unsplashService: UnsplashService, private router: Router) {}

  ngOnInit(): void {
    const savedQuery = localStorage.getItem('query');
    const savedMode = localStorage.getItem('darkMode');
    if (savedQuery) {
      this.query = savedQuery;
      this.search();
    }
    if (savedMode) {
      this.isDarkMode = JSON.parse(savedMode);
    }
  }

  search(): void {
    this.page = 1;
    this.images = [];
    localStorage.setItem('query', this.query);
    this.unsplashService.searchImages(this.query, this.page).subscribe(response => {
      this.images = response.results;
      this.noResults = this.images.length === 0; // Verifica si no hay resultados
      this.page++;
    });
  }

  loadMore(): void {
    this.unsplashService.searchImages(this.query, this.page).subscribe(response => {
      this.images = this.images.concat(response.results);
      this.page++;
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/image', id]);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadMore();
    }
  }
}
