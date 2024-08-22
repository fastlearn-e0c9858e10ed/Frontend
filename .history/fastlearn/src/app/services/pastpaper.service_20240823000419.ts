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

   // Method to upload past papers
   uploadPastpaper(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(error => {
        console.error('Error occurred while uploading past paper:', error);
        return throwError(() => error);
      })
    );
  }

}
