import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; // Ensure Router is imported

@Component({
  selector: 'app-pastpaper',
  templateUrl: './pastpaper.component.html',
  styleUrls: ['./pastpaper.component.css']
})
export class PastpaperComponent implements OnInit {
  myForm: FormGroup;
  years = [{ value: '2024', viewValue: '2024' }, { value: '2025', viewValue: '2025' }];
  subjects = []; // Initialize as empty if no subjects are available
  seasons = [{ value: 'spring', viewValue: 'Spring' }, { value: 'summer', viewValue: 'Summer' }];
  types = [{ value: 'type1', viewValue: 'Type 1' }, { value: 'type2', viewValue: 'Type 2' }];

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      selectedYear: [''],
      selectedSubject: [''],
      selectedSeason: [''],
      selectedType: ['']
    });
  }

  ngOnInit() {
    // Any additional initialization if needed
  }

  redirectToAddSubject() {
    this.router.navigate(['/add-subject']);
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
