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

  // Hardcoded options
  years: number[] = Array.from({ length: 11 }, (_, i) => 2015 + i); // 2015 to 2025
  semesters: string[] = ['Spring', 'Summer', 'Fall', 'Winter']; // Hardcoded semesters
  seasons: string[] = ['Fall', 'Spring', 'Summer']; // Keep this if still needed
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
      semester: ['', Validators.required], // Include semester
      paper_type: ['', Validators.required],
      session: ['', Validators.required], // Include session
      date: [this.date, Validators.required], // Include date control
      file: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.pastpaperService.getOptions().subscribe(data => {
      this.options = data;
    });

    this.subjectService.getAllSubjects().subscribe(subjects => {
      const subjectOptions = subjects.map((subject: any) => ({
        category: 'subject',
        value: subject.id,
        viewValue: subject.name
      }));
      this.options = [...this.options, ...subjectOptions];
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
          this.resetForm();
        },
        error => {
          console.error('Upload failed:', error);
        }
      );
    } else {
      console.log('Form is not valid or file is missing.');
      this.showAlert = false;
    }
  }

  cancelUpload() {
    this.showAlert = false;
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.myForm.patchValue({ file: this.selectedFile });
    console.log('Selected file:', this.selectedFile);
  }

  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }

  resetForm() {
    this.myForm.reset();
    this.selectedFile = null;
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']);
  }
}
