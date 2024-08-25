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
  errorMessage: string = ''; // variable to store error messages

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private subjectService: SubjectService
  ) {
    // initialize the form group with the new structure
    this.addSubjectForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // no additional logic needed here for now
  }

  onSubmit() {
    if (this.addSubjectForm.valid) {
      // Convert all form values to lowercase
      const newSubject = {
        id: this.addSubjectForm.get('id')?.value.toLowerCase(),
        name: this.addSubjectForm.get('name')?.value.toLowerCase(),
        code: this.addSubjectForm.get('code')?.value.toLowerCase()
      };

      this.subjectService.addSubject(newSubject).subscribe({
        next: (response) => {
          console.log('subject added successfully:', response);
          this.courseAdded = true; // indicate that the subject has been added
          this.addSubjectForm.reset(); // reset the form after submission
          this.errorMessage = ''; // clear any previous error message
        },
        error: (error) => {
          console.error('error occurred while adding subject:', error);
          this.errorMessage = 'failed to add subject. please try again.'; // display error message
        }
      });
    }
  }

  confirmAddCourse() {
    if (confirm('are you sure you want to add this subject?')) {
      this.onSubmit();
    }
  }

  viewHomePage(): void {
    this.router.navigate(['toolspage/pastpaper']); // navigate to homepage
  }
}
