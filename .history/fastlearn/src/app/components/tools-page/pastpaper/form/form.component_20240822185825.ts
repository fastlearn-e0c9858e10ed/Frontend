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
  semesters: string[] = ['Semester 1', 'Semester 2', 'Semester 3'];
  types: string[] = ['Mid1', 'Mid2', 'Final'];
  // In form.component.ts
semesters: string[] = ['Semester 1', 'Semester 2', 'Semester 3']; // Add your semester options here

  // Options for dropdowns
  options: { category: string, value: string, viewValue: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pastpaperService: PastpaperService,
    private subjectService: SubjectService
  ) {
    this.myForm = this.fb.group({
      year: ['', Validators.required],
      subject_id: ['', Validators.required],
      session: ['', Validators.required],
      semester: ['', Validators.required],
      paper_type: ['', Validators.required],
      date: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  ngOnInit() {
    // Fetch past paper options
    this.pastpaperService.getOptions().subscribe(data => {
      this.options = data;
    });

    // Fetch subjects and add them to options
    this.subjectService.getAllSubjects().subscribe(subjects => {
      const subjectOptions = subjects.map((subject: any) => ({
        category: 'subject',
        value: subject.id,          // Use subject.id as the value
        viewValue: `${subject.name} (${subject.code})` // Display name and code
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
