import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  private apiUrl = environment.apiUrl + 'pastpapers'; // Should resolve correctly
  constructor(private http: HttpClient) {}

  // Get data for the dropdowns
  getOptions(): Observable<any> {
    console.log('Requesting options from:', this.apiUrl); // Log the URL
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Method to upload past paper
  uploadPastpaper(formData: any, file: File): Observable<any> {
    const formDataObj = new FormData();
    formDataObj.append('year', formData.year.toString());
    formDataObj.append('subject_id', formData.subject_id);
    formDataObj.append('session', formData.session);
    formDataObj.append('semester', formData.semester);
    formDataObj.append('date', formData.date);
    formDataObj.append('paper_type', formData.paper_type);
    formDataObj.append('file', file, file.name);

    // Ensure the URL is correct
    return this.http.post(this.apiUrl, formDataObj).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Generic error handling method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);

    let errorMessage = 'Something went wrong. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
