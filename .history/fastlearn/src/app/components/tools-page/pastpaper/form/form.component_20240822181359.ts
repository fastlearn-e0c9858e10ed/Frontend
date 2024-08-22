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
  showAddSubjectButton: boolean = false;

  // Hardcoded options
  years: number[] = Array.from({ length: 11 }, (_, i) => 2015 + i); // 2015 to 2025
  seasons: string[] = ['Fall', 'Spring', 'Summer'];
  types: string[] = ['Mid1', 'Mid2', 'Final'];

  options: { category: string, value: string, viewValue: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pastpaperService: PastpaperService,
    private subjectService: SubjectService
  ) {
    this.myForm = this.fb.group({
      selectedOption1: ['', Validators.required],
      selectedOption2: ['', Validators.required],
      selectedOption3: ['', Validators.required],
      selectedOption4: ['', Validators.required],
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

    this.myForm.get('selectedOption2')?.valueChanges.subscribe(value => {
      this.checkIfSubjectExists(value);
    });
  }

  onSubmit() {
    if (this.myForm.valid && this.selectedFile) {
      const formData = this.myForm.value;
      this.pastpaperService.uploadPastpaper(formData, this.selectedFile).subscribe(
        response => {
          console.log('Upload successful:', response);
        },
        error => {
          console.error('Upload failed:', error);
        }
      );
    } else {
      console.log('Form is not valid or file is missing.');
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.myForm.patchValue({ file: this.selectedFile });
    console.log('Selected file:', this.selectedFile);
  }

  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }

  checkIfSubjectExists(selectedValue: string) {
    const existingSubject = this.options.some(
      option => option.category === 'subject' && option.value === selectedValue
    );
    this.showAddSubjectButton = !existingSubject;
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']);
  }
}

  /*
export class FormComponent implements OnInit{



  myForm: FormGroup;
  options: { category: string, value: string, viewValue: string }[] = [
    { category: 'year', value: '2021', viewValue: '2021' },
    { category: 'year', value: '2024', viewValue: '2024' },
    { category: 'subject', value: 'pf', viewValue: 'Programming Fundamental' },
    { category: 'subject', value: 'graph theory', viewValue: 'Graph Theory' },
    { category: 'season', value: 'Fall', viewValue: 'Fall' },
    { category: 'season', value: 'Spring', viewValue: 'Spring' },
    { category: 'type', value: 'Mid 1', viewValue: 'Mid 1' },
    { category: 'type', value: 'Final', viewValue: 'Final' }
  ];

  selectedFile: File | null = null;
  showAddSubjectButton: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      selectedOption1: ['', Validators.required],
      selectedOption2: ['', Validators.required],
      selectedOption3: ['', Validators.required],
      selectedOption4: ['', Validators.required],
      file: [null, Validators.required]  // Add validation for the file input
    });
  }

  ngOnInit() {
    this.myForm.get('selectedOption2')?.valueChanges.subscribe(value => {
      this.checkIfSubjectExists(value);
    });

  }

  onSubmit() {
    if (this.myForm.valid && this.selectedFile) {
      console.log(this.myForm.value);
      // Handle form submission
    } else {
      console.log('Form is not valid or file is missing.');
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.myForm.patchValue({ file: this.selectedFile }); // Update form value with file
    console.log('Selected file:', this.selectedFile);
  }

  getOptionsByCategory(category: string) {
    return this.options.filter(option => option.category === category);
  }

  checkIfSubjectExists(selectedValue: string) {
    const existingSubject = this.options.some(
      option => option.category === 'subject' && option.value === selectedValue
    );
    this.showAddSubjectButton = !existingSubject;
  }

  redirectToAddSubject() {
    this.router.navigate(['/addsubject']);
  }
}
  */

