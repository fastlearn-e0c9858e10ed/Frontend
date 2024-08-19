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
      subjectName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addSubjectForm.valid) {
      const newSubject = this.addSubjectForm.value.subjectName;
      // Handle submission logic here
      console.log('New Subject:', newSubject);

      // You can navigate to another page or display a success message here
      // Example: this.router.navigate(['/subject-list']);

      // Optionally, reset the form after submission
      this.addSubjectForm.reset();
    }
  }
}
