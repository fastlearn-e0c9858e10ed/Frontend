import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  apiUrl = environment.apiUrl + 'pastpapers'; // Should resolve correctly


  constructor(private http: HttpClient) {}

  // Get data for the dropdowns
  getOptions(): Observable<any> {
    console.log('Requesting options from:', this.apiUrl); // Log the URL
    return this.http.get<any>(this.apiUrl); // Ensure no extra slashes
  }

  // Method to upload past paper
  uploadPastpaper(formData: any, file: File): Observable<any> {
    const formDataObj = new FormData();
    formDataObj.append('year', formData.year);
    formDataObj.append('subject_id', formData.subject_id);
    formDataObj.append('session', formData.session);
    formDataObj.append('semester', formData.semester);
    formDataObj.append('paper_type', formData.paper_type);
    formDataObj.append('date', formData.date);
    formDataObj.append('file', file, file.name);

    // Ensure the URL is correct
    return this.http.post(this.apiUrl, formDataObj); // This should also resolve correctly
  }

  // Method to fetch all past papers from the API
  getAllPastpapers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Check this too
  }
}
