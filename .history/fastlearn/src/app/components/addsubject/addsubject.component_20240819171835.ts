
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent {
  addSubjectForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addSubjectForm = this.fb.group({
      subjectName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addSubjectForm.valid) {
      const newSubject = this.addSubjectForm.value.subjectName;
      // Handle submission logic here
      console.log('New Subject:', newSubject);
      // Optionally, close the form or reset it after submission
      this.addSubjectForm.reset();
    }
  }
}
