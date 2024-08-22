import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  addSubjectForm: FormGroup;
  courseAdded: boolean = false;
  errorMessage: string = ''; // Variable to store error messages

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService
  ) {
    // Initialize the form group with the new structure
    this.addSubjectForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // No additional logic needed here for now
  }

  onSubmit() {
    if (this.addSubjectForm.valid) {
      const newSubject = this.addSubjectForm.value;

      this.subjectService.addSubject(newSubject).subscribe({
        next: (response) => {
          console.log('Subject added successfully:', response);
          this.courseAdded = true; // Indicate that the subject has been added
          this.addSubjectForm.reset(); // Reset the form after submission
          this.errorMessage = ''; // Clear any previous error message
        },
        error: (error) => {
          console.error('Error occurred while adding subject:', error);
          this.errorMessage = 'Failed to add subject. Please try again.'; // Display error message
        }
      });
    }
  }

  confirmAddCourse() {
    if (confirm('Are you sure you want to add this subject?')) {
      this.onSubmit();
    }
  }

  viewHomePage(): void {
    this.router.navigate(['toolspage/pastpapers']); // Navigate to homepage
  }
}
