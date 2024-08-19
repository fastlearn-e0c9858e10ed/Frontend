import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pastpaper',
  templateUrl: './pastpaper.component.html',
  styleUrls: ['./pastpaper.component.css']
})
export class PastpaperComponent {
  myForm: FormGroup;
  options = [
    { value: 'option1', viewValue: 'Option 1' },
    { value: 'option2', viewValue: 'Option 2' },
    { value: 'option3', viewValue: 'Option 3' }
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
