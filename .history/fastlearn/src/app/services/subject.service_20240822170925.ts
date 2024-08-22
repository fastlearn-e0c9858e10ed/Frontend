import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';// Assuming you have a Subject model
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {


  private apiUrl = environment.apiUrl + 'subjects'; // Update with your API URL


  constructor(private http: HttpClient) { }

  addSubject(subjectData: { courseId: string; fullName: string; alias: string }): Observable<any> {
    return this.http.post(this.apiUrl, subjectData);
  }
}
