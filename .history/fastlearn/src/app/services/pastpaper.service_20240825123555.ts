import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  private apiUrl = environment.apiUrl + 'pastpapers'; // Update to your actual API endpoint

  constructor(private http: HttpClient) {}

  uploadPastpaper(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data, { observe: 'response' }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred while uploading past paper:', error);
        if (error.status === 0) {
          console.error('Network error or server not reachable.');
        } else {
          console.error(`HTTP error status: ${error.status}`);
          console.error(`Error message: ${error.message}`);
        }
        return throwError(error);
      })
    );
  }
}
