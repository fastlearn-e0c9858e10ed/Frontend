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
  showSuccessMessage: boolean = false;
  errorMessage: string = ''; // Variable to store error messages

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
      type: ['', Validators.required],
      session: ['', Validators.required],
      date: [this.date, Validators.required],
      file: [null, Validators.required] // Keep this for validation, but handle differently
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

  generateId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < 16; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
  }

  onSubmit() {
    if (this.myForm.valid) {
      const id = this.generateId();
      const year = this.myForm.get('year')?.value;
      const type = this.myForm.get('type')?.value;
      const session = this.myForm.get('session')?.value;
      const semester = this.myForm.get('semester')?.value;
      const date = this.myForm.get('date')?.value;
      const subject_id = this.myForm.get('subject_id')?.value;
      const file = this.myForm.get('file')?.value;

      // Instead of FormData, construct a JSON object
      const pastpaperData = {
        id: id,
        year: year,
        type: type,
        session: session,
        semester: semester,
        date: date,
        subject_id: subject_id,
        url: `http://localhost:8000/uploads/pastpapers/${file.name}` // Assuming you handle the file upload separately and this is the URL
      };

      this.pastpaperService.uploadPastpaper(pastpaperData).subscribe({
        next: (response) => {
          console.log('Upload successful!', response);
          this.showSuccessMessage = true;
          this.resetForm(); // Reset the form after submission
          this.errorMessage = ''; // Clear any previous error message
        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.errorMessage = 'Upload failed. Please check the form and try again.';
          if (error.status === 422 && error.error.detail) {
            console.error('Error details:', error.error.detail);
            this.errorMessage = 'Server validation failed: ' + error.error.detail.map((e: any) => e.msg).join(', ');
          }
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  resetForm() {
    this.myForm.reset();
    this.errorMessage = ''; // Clear any previous error message
    this.showSuccessMessage = false; // Hide success message
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']);
  }

  // Method to get options by category
  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }
}
