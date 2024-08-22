import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  private apiUrl = environment.apiUrl + 'pastpapers'; // Ensure there's a single slash

  constructor(private http: HttpClient) {}

  // Get data for the dropdowns
  getOptions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Method to upload past paper
  uploadPastpaper(formData: any, file: File): Observable<any> {
    const formDataObj = new FormData();
    formDataObj.append('year', formData.year);
    formDataObj.append('subject_id', formData.subject_id);
    formDataObj.append('session', formData.session); // Updated from 'season' to 'session'
    formDataObj.append('semester', formData.semester); // Added semester field
    formDataObj.append('paper_type', formData.paper_type);
    formDataObj.append('date', formData.date); // Added date field
    formDataObj.append('file', file, file.name);

    // Make sure the URL is correctly formatted
    return this.http.post(this.apiUrl, formDataObj);
  }

  // Method to fetch all past papers from the API
  getAllPastpapers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
