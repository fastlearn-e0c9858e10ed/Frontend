import { Component, OnInit } from '@angular/core';
import { PastpaperService } from '../../../services/pastpaper.service';
import { SubjectService } from '../../../services/subject.service'; // Import SubjectService

@Component({
  selector: 'app-pastpaperdb',
  templateUrl: './pastpaperdb.component.html',
  styleUrls: ['./pastpaperdb.component.css']
})
export class PastpaperdbComponent implements OnInit {
  years: number[] = [2023, 2024, 2025]; // Example years
  subjects: string[] = ['None']; // Will be populated from SubjectService
  seasons: string[] = ['fall', 'spring']; // Example seasons

  selectedYear: number = 2025;
  selectedSubject: string = ''; // Initially empty
  selectedSeason: string = 'fall';
  searchQuery: string = '';

  papers: any[] = []; // Will be populated with past papers from the API
  filteredPapers: any[] = [];

  constructor(
    private pastpaperService: PastpaperService,
    private subjectService: SubjectService // Inject SubjectService
  ) {}

  ngOnInit() {
    this.loadSubjects();
    this.loadPastpapers();
  }

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (data: any[]) => {
        this.subjects = data.map(subject => subject.name); // Adjust based on the actual structure of the response
      },
      error => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

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
      (this.selectedYear === null || paper.year === this.selectedYear) &&
      (this.selectedSubject === '' || paper.subject === this.selectedSubject) &&
      (this.selectedSeason === '' || paper.season === this.selectedSeason) &&
      paper.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  downloadPaper(paper: any) {
    window.open(paper.url, '_blank');
  }
}
