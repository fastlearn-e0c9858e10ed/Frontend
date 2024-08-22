import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PastpaperService } from '../../../../services/pastpaper.service';
import { SubjectService } from '../../../../services/subject.service';

interface PastpaperForm {
  year: string; // Ensure year is a string
  subject_id: string;
  semester: string;
  paper_type: string;
  session: string;
  date: string;
}

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

  years: number[] = Array.from({ length: 11 }, (_, i) => 2015 + i); // Keep years as numbers

  semesters: string[] = ['semester 1', 'Semester 2'];
  types: string[] = ['Mid1', 'Mid2', 'Final'];
  sessions: string[] = ['Spring', 'Summer', 'Fall', 'Winter'];
  options: { category: string, value: string, viewValue: string }[] = [];
  date: string = '2024-08-22'; // Default date

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
    this.subjectService.getAllSubjects().subscribe(subjects => {
      const subjectOptions = subjects.map((subject: any) => ({
        category: 'subject',
        value: subject.id,
        viewValue: subject.id
      }));
      this.options = [...this.options, ...subjectOptions];
    });
  }

  onSubmit() {
    this.showAlert = true;
  }

  confirmUpload() {
    if (this.myForm.valid && this.selectedFile) {
      const formData: PastpaperForm = this.myForm.value; // Cast the form value to PastpaperForm
      this.pastpaperService.uploadPastpaper(formData, this.selectedFile).subscribe(
        response => {
          console.log('Upload successful:', response);
          this.showSuccessMessage = true;
          this.showAlert = false;
          this.errorMessage = null; // Clear error message on success
          this.resetForm();
        },
        error => {
          console.error('Upload failed:', error);
          this.errorMessage = 'Upload failed. Please check the console for more details.';
        }
      );
    } else {
      this.errorMessage = 'Form is not valid or file is missing.';
      this.showAlert = false;
    }
  }

  cancelUpload() {
    this.showAlert = false;
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }

  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }

  resetForm() {
    this.myForm.reset();
    this.selectedFile = null;
    this.errorMessage = null; // Clear error message on reset
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']);
  }
}
