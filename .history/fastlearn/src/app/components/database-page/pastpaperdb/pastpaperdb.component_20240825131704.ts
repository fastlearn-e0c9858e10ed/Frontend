import { Component, OnInit } from '@angular/core';
import { PastpaperService } from '../../../services/pastpaper.service';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-pastpaperdb',
  templateUrl: './pastpaperdb.component.html',
  styleUrls: ['./pastpaperdb.component.css']
})
export class PastpaperdbComponent implements OnInit {
  years: number[] = Array.from({ length: 11 }, (_, i) => 2015 + i); // Years from 2015 to 2025
  semesters: string[] = ['fall', 'spring', 'summer'];
  paper_types: string[] = ['theory', 'lab'];
  sessions: string[] = ['mid1', 'mid2', 'final'];

  subjects: { id: string; name: string }[] = []; // Array to store subjects
  selectedYear: number | null = null; // Allow null for no selection
  selectedSemester: string = '';
  selectedPaperType: string = '';
  selectedSession: string = '';
  selectedSubjectId: string = ''; // ID of the selected subject
  searchQuery: string = '';

  papers: any[] = []; // Will be populated with past papers from the API
  filteredPapers: any[] = [];

  constructor(
    private pastpaperService: PastpaperService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.loadSubjects(); // Fetch subjects
    this.loadPastpapers(); // Fetch past papers
  }

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (data: any[]) => {
        this.subjects = data.map(subject => ({ id: subject.id, name: subject.name })); // Adjust based on the actual structure of the response
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
      (this.selectedSemester === '' || paper.semester === this.selectedSemester) &&
      (this.selectedPaperType === '' || paper.paper_type === this.selectedPaperType) &&
      (this.selectedSession === '' || paper.session === this.selectedSession) &&
      (this.selectedSubjectId === '' || paper.subject_id === this.selectedSubjectId) && // Filter by subject ID
      paper.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  downloadPaper(paper: any) {
    window.open(paper.url, '_blank');
  }
}
