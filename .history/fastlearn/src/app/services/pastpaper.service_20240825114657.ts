import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

// Define an interface for the past paper response, if known
interface PastpaperResponse {
  // Add properties according to the response from your API
  id: string;
  year: number;
  type: string;
  session: string;
  semester: string;
  date: string;
  subject_id: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  private apiUrl = environment.apiUrl + 'pastpapers'; // Update to your actual API endpoint

  constructor(private http: HttpClient) {}
  uploadPastpaper(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError((error) => {
        console.error('Error occurred while uploading past paper:', error);
        return throwError(error);
      })
    );
  }



}
