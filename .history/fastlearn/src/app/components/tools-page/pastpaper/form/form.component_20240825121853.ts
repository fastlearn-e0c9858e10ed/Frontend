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
  selectedFile: File | null = null;
  Build at: 2024-08-25T07:18:10.282Z - Hash: 402e711fb53cc8ca - Time: 329ms

Error: src/app/components/tools-page/pastpaper/form/form.component.ts:50:12 - error TS2339: Property 'fileName' does not exist on type 'FormComponent'.

50       this.fileName = file.name;
              ~~~~~~~~




× Failed to compile.

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
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // File name can be used for debugging or showing a preview if needed
      this.fileName = file.name;
    } else {
      this.errorMessage = 'Please upload a valid file.';
      this.selectedFile = null;
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

  onSubmit(): void {
    if (this.myForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('year', this.myForm.get('year')?.value);
      formData.append('subject_id', this.myForm.get('subject_id')?.value);
      formData.append('type', this.myForm.get('type')?.value); // Use 'type'
      formData.append('semester', this.myForm.get('semester')?.value);
      formData.append('session', this.myForm.get('session')?.value);
      formData.append('date', this.myForm.get('date')?.value);
      formData.append('file', this.selectedFile);

      this.pastpaperService.uploadPastpaper(formData).subscribe(
        response => {
          console.log('Upload successful', response);
          this.showSuccessMessage = true;
          this.resetForm();
        },
        error => {
          console.error('Upload failed:', error);
          if (error.error && error.error.detail) {
            this.errorMessage = 'Upload failed: ' + error.error.detail.map((err: any) => err.msg).join(', ');
          } else {
            this.errorMessage = 'Upload failed. Please check the form and try again.';
          }
        }
      );
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
