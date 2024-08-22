

// src/app/services/subject.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'https://your-api-url.com/subjects'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  addSubject(subjectData: { courseId: string; fullName: string; alias: string }): Observable<any> {
    return this.http.post(this.apiUrl, subjectData);
  }
}
