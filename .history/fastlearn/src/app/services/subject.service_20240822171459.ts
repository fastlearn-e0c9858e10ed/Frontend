// src/app/services/subject.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8000/api/v1/subjects'; // API URL for the subjects endpoint

  constructor(private http: HttpClient) { }

  // Method to add a new subject
  addSubject(subjectData: { courseId: string; fullName: string; alias: string }): Observable<any> {
    // Set appropriate headers if needed
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, subjectData, { headers }).pipe(
      catchError(error => {
        console.error('Error occurred while adding subject:', error);
        return throwError(() => error); // Forward the error
      })
    );
  }
}
