import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // Update to your correct path

// Interface for the expected response from the API
export interface PastPaperResponse {
  id: string;
  year: number;
  type: string;
  session: string;
  semester: string;
  date: string;
  subject_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  private apiUrl = `${environment.apiUrl}pastpapers`; // Update to your actual API endpoint

  constructor(private http: HttpClient) {}

  // Method to upload past paper
  uploadPastpaper(formData: FormData): Observable<PastPaperResponse> {
    return this.http.post<PastPaperResponse>(this.apiUrl, formData).pipe(
      catchError(this.handleError) // Handle errors if needed
    );
  }

  // Private method to handle errors from the API
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
