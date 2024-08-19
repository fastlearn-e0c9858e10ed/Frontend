import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as lottie from 'lottie-web';

@Component({
  selector: 'app-pastpaper',
  templateUrl: './pastpaper.component.html',
  styleUrls: ['./pastpaper.component.css']
})
export class PastpaperComponent implements OnInit {
  myForm: FormGroup;
  lottieAnimation: any;
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
    this.lottieAnimation = lottie.loadAnimation({
      container: document.getElementById('lottie-container') as HTMLElement,
      path: '/assets/loading.json', // path to your animation json file
      renderer: 'svg',
      loop: true,
      autoplay: true
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
    this.router.navigate(['/add-subject']);
  }
}
