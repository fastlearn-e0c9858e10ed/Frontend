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
  options1: { value: string, viewValue: string }[] = [
    { value: '2021', viewValue: '2021' },
    { value: 'option1-2', viewValue: 'Option 1-2' }
  ];

  options2: { value: string, viewValue: string }[] = [
    { value: 'option2-1', viewValue: 'Programming Fundamental' },
    { value: 'option2-2', viewValue: 'Option 2-2' }
  ];

  options3: { value: string, viewValue: string }[] = [
    { value: 'option3-1', viewValue: 'Fall' },
    { value: 'option3-2', viewValue: 'Option 3-2' }
  ];

  options4: { value: string, viewValue: string }[] = [
    { value: 'option3-1', viewValue: 'Mid 1' },
    { value: 'option3-2', viewValue: 'Option 3-2' }
  ];

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      selectedOption1: ['', Validators.required],
      selectedOption2: ['', Validators.required],
      selectedOption3: ['', Validators.required]
    });
  }

  ngOnInit(){

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
}
