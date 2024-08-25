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
  errorMessage: string = '';
  selectedFile: File;

  years: number[] = Array.from({ length: 11 }, (_, i) => 2015 + i);
  semesters: string[] = ['Semester 1', 'Semester 2'];
  types: string[] = ['theory', 'practical'];
  sessions: string[] = ['Mid1', 'Mid2', 'Final'];
  options: { category: string, value: string, viewValue: string }[] = [];
  date: string = '2024-08-22';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pastpaperService: PastpaperService,
    private subjectService: SubjectService
  ) {
    this.myForm = this.fb.group({
      subject_id: ['', Validators.required],
      url: ['', Validators.required],
      type: ['', Validators.required],
      semester: ['', Validators.required],
      session: ['', Validators.required],
      year: [null, Validators.required],
      date: [this.date, Validators.required]
    });
  }

  ngOnInit() {
    this.loadSubjects();
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.myForm.patchValue({
        url: `http://localhost:8000/uploads/pastpapers/${this.selectedFile.name}`
      });
    } else {
      this.selectedFile = null;
      this.errorMessage = 'Please upload a valid file.';
    }
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
    if (this.myForm.valid && this.selectedFile) {
      const payload = {
        id: this.generateId(),
        year: this.myForm.get('year')?.value,
        type: this.myForm.get('type')?.value,
        session: this.myForm.get('session')?.value,
        semester: this.myForm.get('semester')?.value,
        date: this.myForm.get('date')?.value,
        subject_id: this.myForm.get('subject_id')?.value,
        url: this.myForm.get('url')?.value
      };

      this.pastpaperService.uploadPastpaper(payload).subscribe({
        next: () => {
          this.showSuccessMessage = true;
          this.resetForm();
        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.errorMessage = 'Upload failed. Please check the form and try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly and upload a file.';
    }
  }

  resetForm() {
    this.myForm.reset();
    this.errorMessage = '';
    this.showSuccessMessage = false;
    this.selectedFile = null;
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']);
  }

  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }
}
