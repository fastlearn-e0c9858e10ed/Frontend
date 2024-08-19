import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  addSubjectForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {
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
      this.addSubjectForm.reset();
    }
  }


  viewHomePage(): void {
    this.router.navigate(['/toolspage/pastpaper']); // Navigate to homepage
  }
}
