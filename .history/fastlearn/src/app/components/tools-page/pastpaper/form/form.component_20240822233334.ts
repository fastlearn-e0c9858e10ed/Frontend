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
  // selectedFile: File | null = null; // Commented out for now
  showAlert: boolean = false;
  showSuccessMessage: boolean = false;
  errorMessage: string | null = null;

  // Hardcoded options
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

  onSubmit() {
    this.confirmUpload(); // Directly call confirmUpload on form submission
  }


  confirmUpload() {
    // Log form values for debugging
    console.log('Form values:', this.myForm.value);

    if (this.myForm.valid /* && this.selectedFile */) {
      const formData = new FormData();
      formData.append('year', this.myForm.get('year')?.value);
      formData.append('subject_id', this.myForm.get('subject_id')?.value);
      formData.append('semester', this.myForm.get('semester')?.value);
      formData.append('paper_type', this.myForm.get('paper_type')?.value);
      formData.append('session', this.myForm.get('session')?.value);
      formData.append('date', this.myForm.get('date')?.value);
      // formData.append('file', this.selectedFile); // Commented out for now

      // Call the service to upload the formData
      this.pastpaperService.uploadPastpaper(formData).subscribe(
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
      this.errorMessage = 'Form is not valid.'; // Removed file-related validation
      this.showAlert = false;
    }
  }

  cancelUpload() {
    this.showAlert = false;
  }

  // onFileChange(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   console.log('Selected file:', this.selectedFile);
  // }

  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }

  resetForm() {
    this.myForm.reset();
    // this.selectedFile = null; // Commented out for now
    this.errorMessage = null; // Clear error message on reset
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']);
  }
}
