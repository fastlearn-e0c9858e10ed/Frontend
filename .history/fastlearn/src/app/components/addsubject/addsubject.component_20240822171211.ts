// src/app/services/subject.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8000/api/v1/subjects'; // Use your API URL

  constructor(private http: HttpClient) { }

  addSubject(subjectData: { courseId: string; fullName: string; alias: string }): Observable<any> {
    return this.http.post(this.apiUrl, subjectData).pipe(
      catchError(error => {
        console.error('Error occurred while adding subject:', error);
        return throwError(() => error);
      })
    );
  }
}
