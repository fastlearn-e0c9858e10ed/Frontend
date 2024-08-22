import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjects: any[] = []; // Array to hold subjects
  private subjectsSubject = new Subject<any[]>(); // Subject to emit changes

  constructor() { }

  // Method to add a new subject
  addSubject(subject: any) {
    this.subjects.push(subject); // Add the new subject to the array
    this.subjectsSubject.next(this.subjects); // Emit the updated subjects array
  }

  // Method to get all subjects
  getSubjects() {
    return this.subjectsSubject.asObservable(); // Return an observable for the subjects
  }
}
