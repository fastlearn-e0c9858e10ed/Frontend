import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Subject } from '../models/subject.model'; // Assuming you have a Subject model
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjects: Subject[] = []; // Array to hold the subjects
  private subjectsSubject = new BehaviorSubject<Subject[]>(this.subjects); // Create a BehaviorSubject

  // Observable to be used by components to get the current list of subjects
  subjects$ = this.subjectsSubject.asObservable();

  private apiUrl = environment.apiUrl + 'subjects'; // Update with your API URL

  constructor(private http: HttpClient) {}

  constructor(private http: HttpClient) { }

  addSubject(subjectData: { courseId: string; fullName: string; alias: string }): Observable<any> {
    return this.http.post(this.apiUrl, subjectData);
  }
}
