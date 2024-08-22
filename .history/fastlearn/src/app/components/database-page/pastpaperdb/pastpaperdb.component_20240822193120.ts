import { Component, OnInit } from '@angular/core';
import { PastpaperService } from '../../../services/pastpaper.service';

@Component({
  selector: 'app-pastpaperdb',
  templateUrl: './pastpaperdb.component.html',
  styleUrls: ['./pastpaperdb.component.css']
})
export class PastpaperdbComponent implements OnInit {
  years: number[] = [2023, 2024, 2025]; // Example years
  subjects: string[] = ['pdc', 'math', 'phy']; // Example subjects
  seasons: string[] = ['fall', 'spring']; // Example seasons

  selectedYear: number = 2025;
  selectedSubject: string = 'pdc';
  selectedSeason: string = 'fall';
  searchQuery: string = '';

  papers: any[] = []; // Will be populated with past papers from the API
  filteredPapers: any[] = [];

  constructor(private pastpaperService: PastpaperService) {}

  ngOnInit() {
    this.loadPastpapers();
  }
}
  /*
  loadPastpapers() {
    this.pastpaperService.getAllPastpapers().subscribe(
      data => {
        this.papers = data;
        this.filteredPapers = [...this.papers];
      },
      error => {
        console.error('Error fetching past papers:', error);
      }
    );
  }

  filterPapers() {
    this.filteredPapers = this.papers.filter(paper =>
      paper.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    // Add more filters based on year, subject, season if needed
  }

  downloadPaper(paper: any) {
    window.open(paper.url, '_blank');
  }
}

