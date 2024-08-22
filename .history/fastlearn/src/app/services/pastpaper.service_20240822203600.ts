import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

interface PastpaperForm {
    year: string;
    subject_id: string;
    semester: string;
    paper_type: string;
    session: string;
    date: string;
}

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  private apiUrl = environment.apiUrl + 'pastpapers';

  constructor(private http: HttpClient) {}

  // Get data for the dropdowns
  getOptions(): Observable<any> {
    console.log('Requesting options from:', this.apiUrl);
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  uploadPastpaper(formData: PastpaperForm, file: File): Observable<any> {
    const formDataToSend = new FormData();

    // Append form fields to FormData
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append the file
    formDataToSend.append('file', file, file.name);

    return this.http.post<any>(this.apiUrl, formDataToSend).pipe(
      tap(response => console.log('Upload response:', response)), // Log response
      catchError(this.handleError)
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
