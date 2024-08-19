import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pastpaper',
  templateUrl: './pastpaper.component.html',
  styleUrls: ['./pastpaper.component.css']
})
export class PastpaperComponent {
  myForm: FormGroup;
  myForm: FormGroup;
  options1: { value: string, viewValue: string }[] = [
    { value: 'option1-1', viewValue: 'Option 1-1' },
    { value: 'option1-2', viewValue: 'Option 1-2' }
    // Add more options as needed
  ];

  options2: { value: string, viewValue: string }[] = [
    { value: 'option2-1', viewValue: 'Option 2-1' },
    { value: 'option2-2', viewValue: 'Option 2-2' }
    // Add more options as needed
  ];

  options3: { value: string, viewValue: string }[] = [
    { value: 'option3-1', viewValue: 'Option 3-1' },
    { value: 'option3-2', viewValue: 'Option 3-2' }
    // Add more options as needed
  ];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      selectedOption: ['']
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Selected Option:', this.myForm.value.selectedOption);
      console.log('Selected File:', this.selectedFile);
    }
  }
}
