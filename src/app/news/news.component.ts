import { Component, inject } from '@angular/core';
import { NewsService } from "../services/news.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  news: any[] = [];

  private newsService = inject(NewsService);

  constructor() { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((data: any[]) => {
      this.news = data;
    });
  }
}
