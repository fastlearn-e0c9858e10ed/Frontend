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
  errorMessage: string | null = null; // Added error message property

  // Hardcoded options
  years: number[] = Array.from({ length: 11 }, (_, i) => 2015 + i); // 2015 to 2025
  semesters: string[] = ['Spring', 'Summer', 'Fall', 'Winter']; // Hardcoded semesters
  types: string[] = ['Mid1', 'Mid2', 'Final'];

  // Define sessions array
  sessions: string[] = ['Session 1', 'Session 2', 'Session 3']; // Example values
  options: { category: string, value: string, viewValue: string }[] = [];

  // Initialize date in YYYY-MM-DD format
  date: string = '2024-08-22'; // Replace with the desired default date

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
      // No need to include 'file' here as it's handled separately
    });
  }

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe(subjects => {
      // Create an array of subject IDs only
      const subjectIDs = subjects.map((subject: any) => subject.id);
      this.options = subjectIDs; // Set this.options to only the IDs

      console.log('Loaded subject IDs:', this.options); // Log the loaded IDs
    }, error => {
      console.error('Error loading subjects:', error); // Log any error that occurs
    });
  }


  onSubmit() {
    this.showAlert = true;
  }

  confirmUpload() {
    if (this.myForm.valid && this.selectedFile) {
      const formData = this.myForm.value;
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
          this.errorMessage = 'Upload failed. Please check the console for more details.'; // Inform the user
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
