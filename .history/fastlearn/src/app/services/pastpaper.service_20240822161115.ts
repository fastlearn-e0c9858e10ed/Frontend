import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {

  private apiUrl = environment.apiUrl + 'pastpapers';  // Base API URL from environment variable

  constructor(private http: HttpClient) {}

  // get data for the drop downs
  getOptions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/options`);
  }

  // Method to upload the selected options along with a PDF to the backend
  uploadPastpaper(data: any, file: File): Observable<any> {
    const formData: FormData = new FormData();

    // Append selected options to the FormData
    formData.append('year', data.selectedOption1);
    formData.append('subject', data.selectedOption2);
    formData.append('season', data.selectedOption3);
    formData.append('type', data.selectedOption4);

    // Append the file to the FormData
    formData.append('file', file, file.name);

    // Make the POST request to upload data
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }
}
