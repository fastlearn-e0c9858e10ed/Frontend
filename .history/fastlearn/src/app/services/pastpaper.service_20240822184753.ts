import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  private apiUrl = environment.apiUrl + '/pastpapers';  // Base API URL from environment variable

  constructor(private http: HttpClient) {}

  // Get data for the dropdowns
  getOptions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Method to upload the selected options along with a PDF to the backend
  uploadPastpaper(data: any, file: File): Observable<any> {
    const formData: FormData = new FormData();

    // Append selected options to the FormData
    formData.append('year', data.year);
    formData.append('paper_type', data.paper_type);
    formData.append('session', data.session);
    formData.append('semester', data.semester);
    formData.append('date', data.date);
    formData.append('subject_id', data.subject_id);

    // Append the file to the FormData
    formData.append('file', file, file.name);

    // Make the POST request to upload data
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  // Method to fetch all past papers from the API
  getAllPastpapers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
