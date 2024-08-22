import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PastpaperService } from '../../../../services/pastpaper.service';
import { SubjectService } from '../../../../services/subject.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  selectedFile: File | null = null;
  showAlert: boolean = false;
  showSuccessMessage: boolean = false;
  errorMessage: string | null = null;

  years: number[] = Array.from({ length: 11 }, (_, i) => 2015 + i); // 2015 to 2025
  semesters: string[] = ['Semester 1', 'Semester 2'];
  types: string[] = ['Mid1', 'Mid2', 'Final'];
  sessions: string[] = ['Spring', 'Summer', 'Fall', 'Winter'];
  options: { category: string, value: string, viewValue: string }[] = [];
  date: string = '2024-08-22';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pastpaperService: PastpaperService,
    private subjectService: SubjectService
  ) {
    this.myForm = this.fb.group({
      year: ['', Validators.required],
      subject_id: ['', Validators.required],
      semester: ['', Validators.required],
      paper_type: ['', Validators.required],
      session: ['', Validators.required],
      date: [this.date, Validators.required],
    });
  }

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      subjects => {
        const subjectOptions = subjects.map((subject: any) => ({
          category: 'subject',
          value: subject.id,
          viewValue: subject.name // Assuming subject has a name property
        }));
        this.options = [...this.options, ...subjectOptions];
      },
      error => {
        console.error('Failed to load subjects:', error);
        this.errorMessage = 'Could not load subjects. Please try again later.';
      }
    );
  }

  onSubmit() {
    this.showAlert = true; // Show confirmation alert
  }

  confirmUpload() {
    if (this.myForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('year', this.myForm.get('year')?.value);
      formData.append('subject_id', this.myForm.get('subject_id')?.value);
      formData.append('semester', this.myForm.get('semester')?.value);
      formData.append('paper_type', this.myForm.get('paper_type')?.value);
      formData.append('session', this.myForm.get('session')?.value);
      formData.append('date', this.myForm.get('date')?.value);
      formData.append('file', this.selectedFile, this.selectedFile.name); // Append file with its name

      // Call the service to upload the past paper
      this.pastpaperService.uploadPastpaper(formData).subscribe(
        (data) => {
          console.log('Upload File ', data);
          this.showSuccessMessage = true;
          this.showAlert = false; // Hide alert after upload
          this.errorMessage = null; // Clear error message on success
          this.resetForm();
        },
        (error) => {
          console.error('Upload failed:', error);
          this.errorMessage = 'Upload failed. Please try again later.'; // General error message
        }
      );
    } else {
      this.errorMessage = 'Form is not valid or file is missing.';
      this.showAlert = false; // Hide alert if form is invalid
    }
  }

  cancelUpload() {
    this.showAlert = false; // Cancel upload and hide alert
  }

  onFileChange(event: any) {
    const pdfFiles = event.target.files;
    this.selectedFile = pdfFiles.item(0); // Get the first file

    if (this.selectedFile) {
      console.log('Selected file:', this.selectedFile);
    } else {
      this.errorMessage = 'No file selected.';
    }
  }

  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }

  resetForm() {
    this.myForm.reset();
    this.selectedFile = null;
    this.errorMessage = null; // Clear error message on reset
    this.showSuccessMessage = false; // Hide success message
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']); // Navigate to the add subject route
  }
}
