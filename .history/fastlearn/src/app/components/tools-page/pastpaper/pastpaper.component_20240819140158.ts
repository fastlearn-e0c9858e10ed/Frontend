import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pastpaper',
  templateUrl: './pastpaper.component.html',
  styleUrls: ['./pastpaper.component.css']
})
export class PastpaperComponent implements OnInit {
  myForm: FormGroup;
  options: { category: string, value: string, viewValue: string }[] = [
    { category: 'year', value: '2021', viewValue: '2021' },
    { category: 'year', value: 'option1-2', viewValue: 'Option 1-2' },
    { category: 'subject', value: 'option2-1', viewValue: 'Programming Fundamental' },
    { category: 'subject', value: 'option2-2', viewValue: 'Option 2-2' },
    { category: 'season', value: 'option3-1', viewValue: 'Fall' },
    { category: 'season', value: 'option3-2', viewValue: 'Option 3-2' },
    { category: 'type', value: 'option3-1', viewValue: 'Mid 1' },
    { category: 'type', value: 'option3-2', viewValue: 'Option 3-2' }
  ];

  selectedFile: File | null = null;
  showAddSubjectButton: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      selectedOption1: ['', Validators.required],
      selectedOption2: ['', Validators.required],
      selectedOption3: ['', Validators.required],
      selectedOption4: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.myForm.get('selectedOption2')?.valueChanges.subscribe(value => {
      this.checkIfSubjectExists(value);
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      // Handle form submission
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
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
