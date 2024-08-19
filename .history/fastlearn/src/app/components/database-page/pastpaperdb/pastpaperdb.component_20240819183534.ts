import { Component } from '@angular/core';

@Component({
  selector: 'app-pastpaperdb',
  templateUrl: './pastpaperdb.component.html',
  styleUrls: ['./pastpaperdb.component.css']
})
export class PastpaperdbComponent {
  years: number[] = [2023, 2024, 2025]; // Example years
  subjects: string[] = ['pdc', 'math', 'phy']; // Example subjects
  seasons: string[] = ['fall', 'spring']; // Example seasons

  selectedYear: number = 2025;
  selectedSubject: string = 'pdc';
  selectedSeason: string = 'fall';
  searchQuery: string = '';

  papers = [
    { name: 'PAST PAPER 1', url: 'path-to-past-paper-1.pdf' },
    { name: 'PAST PAPER 2', url: 'path-to-past-paper-2.pdf' },
    // Add more past papers here
  ];

  filteredPapers = [...this.papers];

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
