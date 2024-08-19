import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  addSubjectForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addSubjectForm = this.fb.group({
      courseId: ['', Validators.required],
      fullName: ['', Validators.required],
      alias: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addSubjectForm.valid) {
      const newCourse = this.addSubjectForm.value;
      console.log('New Course:', newCourse);
      // Add your submission logic here (e.g., sending data to a server)

      // Optionally reset the form after submission
      this.addSubjectForm.reset();
    }
  }
}
