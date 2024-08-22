import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface SubjectData {
  courseId: string;
  fullName: string;
  alias: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = `${environment.apiUrl}subjects`;

  private subjects: SubjectData[] = []; // Array to hold subjects
  private subjectsSubject = new BehaviorSubject<SubjectData[]>(this.subjects); // Emit current subjects on subscription

  constructor(private http: HttpClient) {
    this.loadSubjects(); // Load existing subjects on initialization
  }

  // Method to fetch subjects from API
  loadSubjects() {
    this.http.get<SubjectData[]>(this.apiUrl).subscribe(
      (data) => {
        this.subjects = data; // Update the local subjects array
        this.subjectsSubject.next(this.subjects); // Emit the updated subjects array
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

  // Method to add a new subject
  addSubject(subject: SubjectData) {
    this.subjects.push(subject); // Add the new subject to the array
    this.subjectsSubject.next(this.subjects); // Emit the updated subjects array

    // Optionally, persist the new subject to the API
    this.addSubjectToApi(subject);
  }

  // Method to persist new subject to the API
  private addSubjectToApi(subject: SubjectData) {
    this.http.post<SubjectData>(this.apiUrl, subject).subscribe(
      (response) => {
        console.log('Subject added:', response);
        // Handle success if needed
      },
      (error) => {
        console.error('Error adding subject:', error);
      }
    );
  }

  // Method to get all subjects
  getSubjects() {
    return this.subjectsSubject.asObservable(); // Return an observable for the subjects
  }
}
