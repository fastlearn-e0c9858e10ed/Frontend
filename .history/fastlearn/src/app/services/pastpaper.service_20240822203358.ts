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

  uploadPastpaper(formData: any, file: File): Observable<any> {
    const formDataToSend = new FormData();

    // Assuming you want to include file and other fields in the FormData
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataToSend.append(key, formData[key]);
        }
    }

    // Append the file
    formDataToSend.append('file', file, file.name);

    return this.http.post('your/api/endpoint', formDataToSend);
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
