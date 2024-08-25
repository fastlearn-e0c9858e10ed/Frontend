import { Component, OnInit } from '@angular/core';
import { PastpaperService } from '../../../services/pastpaper.service';
import { SubjectService } from '../../../services/subject.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pastpaperdb',
  templateUrl: './pastpaperdb.component.html',
  styleUrls: ['./pastpaperdb.component.css']
})
export class PastpaperdbComponent implements OnInit {
  years: number[] = Array.from({ length: 11 }, (_, i) => 2015 + i);
  semesters: string[] = ['fall', 'spring', 'summer'];
  paper_types: string[] = ['theory', 'lab'];
  sessions: string[] = ['mid1', 'mid2', 'final'];
  subjects: { id: string, name: string }[] = [];

  selectedYear: number | null = null;
  selectedSemester: string = '';
  selectedPaperType: string = '';
  selectedSession: string = '';
  selectedSubjectId: string = '';
  searchQuery: string = '';

  papers: any[] = []; // Will be populated with past papers from the API
  filteredPapers: any[] = [];

  constructor(
    private pastpaperService: PastpaperService,
    private subjectService: SubjectService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadPastpapers();
    this.loadSubjects();
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

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      data => {
        this.subjects = data;
      },
      error => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

  filterPapers() {
    const searchLower = this.searchQuery.toLowerCase();

    this.filteredPapers = this.papers.filter(paper => {
      const matchesYear = this.selectedYear ? paper.year === this.selectedYear : true;
      const matchesSemester = this.selectedSemester ? paper.semester === this.selectedSemester : true;
      const matchesPaperType = this.selectedPaperType ? paper.paper_type === this.selectedPaperType : true;
      const matchesSession = this.selectedSession ? paper.session === this.selectedSession : true;
      const matchesSubject = this.selectedSubjectId ? paper.subject_id === this.selectedSubjectId : true;

      // Check if the search query matches any of the fields
      const nameMatches = paper.name ? paper.name.toLowerCase().includes(searchLower) : false;
      const yearMatches = paper.year ? paper.year.toString().includes(searchLower) : false;
      const semesterMatches = paper.semester ? paper.semester.toLowerCase().includes(searchLower) : false;
      const paperTypeMatches = paper.paper_type ? paper.paper_type.toLowerCase().includes(searchLower) : false;
      const sessionMatches = paper.session ? paper.session.toLowerCase().includes(searchLower) : false;
      const subjectIdMatches = paper.subject_id ? paper.subject_id.toLowerCase().includes(searchLower) : false;

      return matchesYear && matchesSemester && matchesPaperType && matchesSession && matchesSubject &&
             (nameMatches || yearMatches || semesterMatches || paperTypeMatches || sessionMatches || subjectIdMatches);
    });
  }


  downloadPaper(paper: any) {
    window.open(paper.url, '_blank');
  }
  viewPdf(url: string) {
    // Use URL encoding if necessary
    const encodedUrl = encodeURIComponent(url);
    this.router.navigate(['/pdfviewer', encodedUrl]);
  }
}
