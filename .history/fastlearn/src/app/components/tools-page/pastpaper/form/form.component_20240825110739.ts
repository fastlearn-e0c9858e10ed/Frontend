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
  fileToUpload: File | null = null; // Store uploaded file

  years: number[] = Array.from({ length: 11 }, (_, i) => 2015 + i); // Years from 2015 to 2025
  semesters: string[] = ['Semester 1', 'Semester 2']; // Updated semesters
  types: string[] = ['theory', 'practical']; // Updated types
  sessions: string[] = ['Mid1', 'Mid2', 'Final']; // Updated sessions
  options: { category: string, value: string, viewValue: string }[] = [];
  date: string = '2024-08-22'; // Hardcoded date

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pastpaperService: PastpaperService,
    private subjectService: SubjectService
  ) {
    this.myForm = this.fb.group({
      subject_id: ['', Validators.required],
      url: ['', Validators.required], // URL for the uploaded file
      type: ['', Validators.required], // Add 'type' control
      semester: ['', Validators.required], // Add 'semester' control
      session: ['', Validators.required], // Add 'session' control
      year: [null, Validators.required], // Year control (initialized as null)
      date: [this.date, Validators.required] // Set to the hardcoded date
    });
  }

  ngOnInit() {
    this.loadSubjects();
  }
  // Method to handle file input changes
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Get the selected file
    } else {
      this.selectedFile = null; // Reset if no file is selected
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

  // Function to generate a unique random ID
  generateId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < 16; i++) {
      randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
  }

  // File upload handler
  handleFileInput(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileToUpload = file; // Store the uploaded file
      this.myForm.patchValue({
        url: `http://localhost:8000/uploads/pastpapers/${file.name}` // Generate the URL based on file name
      });
    } else {
      this.errorMessage = 'Please upload a valid file.';
      this.fileToUpload = null; // Reset if no file is uploaded
    }
  }

  onSubmit() {
    if (this.myForm.valid && this.fileToUpload) {
      const subject_id = this.myForm.get('subject_id')?.value;
      const year = this.myForm.get('year')?.value; // Get year from the form as an integer
      const id = this.generateId(); // Generate a unique random ID

      // Create the payload as per the JSON structure
      const payload = {
        id: id,
        year: year,
        type: this.myForm.get('type')?.value,
        session: this.myForm.get('session')?.value,
        semester: this.myForm.get('semester')?.value,
        date: this.myForm.get('date')?.value,
        subject_id: subject_id,
        url: this.myForm.get('url')?.value // URL for the uploaded file
      };

      // Call the service to upload the data
      this.pastpaperService.uploadPastpaper(payload).subscribe({
        next: (response) => {
          console.log('Upload successful!', response);
          this.showSuccessMessage = true;
          this.resetForm(); // Reset the form after submission
          this.errorMessage = ''; // Clear any previous error message
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
    this.errorMessage = ''; // Clear any previous error message
    this.showSuccessMessage = false; // Hide success message
    this.fileToUpload = null; // Reset uploaded file
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']);
  }

  // Method to get options by category
  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }
}
