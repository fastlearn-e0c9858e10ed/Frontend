import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = environment.apiUrl+'subjects'; // Use your API URL

  constructor(private http: HttpClient) { }

  addSubject(subjectData: { id: string; name: string; code: string }): Observable<any> {
    return this.http.post(this.apiUrl, subjectData).pipe(
      catchError(error => {
        console.error('Error occurred while adding subject:', error);
        return throwError(() => error);
      })
    );
  }
}

