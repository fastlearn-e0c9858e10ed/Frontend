import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {

  private apiUrl = 'https://your-api-endpoint.com'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Method to submit form data to the backend
  submitFormData(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/submit`, formData, { headers });
  }

  // Method to fetch options for the dropdowns from the backend
  getOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/options`);
  }

  // Method to upload a file to the backend
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  // Method to check if the selected subject exists
  checkIfSubjectExists(subject: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-subject?subject=${subject}`);
  }
}
