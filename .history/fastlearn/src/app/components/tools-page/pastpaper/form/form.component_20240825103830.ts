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

  years: number[] = [2030]; // Hardcoded year 2030
  semesters: string[] = ['spring']; // Limited to spring
  types: string[] = ['theory']; // Limited to theory
  sessions: string[] = ['mid1']; // Limited to mid1
  date: string = '2018-02-04'; // Hardcoded date
  options: { category: string, value: string, viewValue: string }[] = [];

  selectedFile: File | null = null; // Store the selected file

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pastpaperService: PastpaperService,
    private subjectService: SubjectService
  ) {
    this.myForm = this.fb.group({
      subject_id: ['', Validators.required],
      url: ['', Validators.required], // URL for the uploaded file
      file: [null, Validators.required] // File input
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

  generateId(subject_id: string): string {
    return `${subject_id}-2030-theory-mid1-spring`;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.myForm.patchValue({
        file: file
      });
      this.myForm.patchValue({
        url: `http://localhost:8000/uploads/pastpapers/${file.name}`
      });
    }
  }

  onSubmit() {
    if (this.myForm.valid && this.selectedFile) {
      const subject_id = this.myForm.get('subject_id')?.value;
      const id = this.generateId(subject_id);

      // Create a FormData object for the file upload
      const formData = new FormData();
      formData.append('id', id);
      formData.append('year', '2030'); // Hardcoded year
      formData.append('type', 'theory'); // Hardcoded type
      formData.append('session', 'mid1'); // Hardcoded session
      formData.append('semester', 'spring'); // Hardcoded semester
      formData.append('date', '2018-02-04'); // Hardcoded date
      formData.append('subject_id', subject_id);
      formData.append('url', this.myForm.get('url')?.value); // URL for the file
      formData.append('file', this.selectedFile); // File upload

      this.pastpaperService.uploadPastpaper(formData).subscribe({
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
    this.selectedFile = null; // Clear the selected file
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
