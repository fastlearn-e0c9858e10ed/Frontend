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
  uploadPastpaper(formData: { id: string; year:number;type:string,session:string;semester:string;date:string;subject_id:string}): Observable<any> {
    return this.http.post(this.apiUrl, formData).pipe(
      catchError(error => {
        console.error('Error occurred while adding subject:', error);
        return throwError(() => error);
      })
    );
  }

}
