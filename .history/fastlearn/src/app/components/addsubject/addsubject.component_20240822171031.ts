// src/app/components/addsubject/addsubject.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service'; // Adjust the path as necessary

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  addSubjectForm: FormGroup;
  courseAdded: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private subjectService: SubjectService) {
    // Initialize the form group in the constructor
    this.addSubjectForm = this.fb.group({
      courseId: ['', Validators.required],
      fullName: ['', Validators.required],
      alias: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Form group is already initialized in the constructor
  }

  onSubmit() {
    if (this.addSubjectForm.valid) {
      const newCourse = this.addSubjectForm.value;
      console.log('New Course:', newCourse);
      this.subjectService.addSubject(newCourse).subscribe(
        response => {
          console.log('Subject added successfully:', response);
          this.courseAdded = true; // Indicate that the course has been added
          this.addSubjectForm.reset(); // Reset the form
        },
        error => {
          console.error('Error adding subject:', error);
        }
      );
    }
  }

  confirmAddCourse() {
    if (confirm('Are you sure you want to add this course?')) {
      this.onSubmit();
    }
  }

  viewHomePage(): void {
    this.router.navigate(['toolspage/pastpaper']); // Navigate to homepage
  }
}
