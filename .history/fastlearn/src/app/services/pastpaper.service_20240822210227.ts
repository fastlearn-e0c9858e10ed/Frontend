import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../.history/fastlearn/src/environments/environment.development_20240822191850';

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  private apiUrl = environment.apiUrl + "pastpapers"; // Update to your actual API endpoint

  constructor(private http: HttpClient) {}

  uploadPastpaper(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(this.handleError) // Handle errors if needed
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
