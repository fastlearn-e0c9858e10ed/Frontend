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
      const formData = {
        id: this.generateId(),
        year: this.myForm.get('year')?.value,
        type: this.myForm.get('paper_type')?.value,
        session: this.myForm.get('session')?.value,
        semester: this.myForm.get('semester')?.value,
        date: this.myForm.get('date')?.value,
        subject_id: this.myForm.get('subject_id')?.value
      };

      this.pastpaperService.uploadPastpaper(formData).subscribe(
        response => {
          console.log('Upload successful!', response);
          this.showSuccessMessage = true;
          this.resetForm();
        },
        (error) => {
          console.error('Upload failed:', error);
          this.errorMessage = 'Upload failed. Please check the form and try again.';
          if (error.status === 422 && error.error.detail) {
            console.error('Error details:', error.error.detail);
          }
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  cancelUpload() {
    this.showAlert = false;
  }

  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }

  resetForm() {
    this.myForm.reset();
    this.errorMessage = null;
    this.showSuccessMessage = false;
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']);
  }
}

