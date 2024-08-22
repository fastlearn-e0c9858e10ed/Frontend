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

  // Get data for the dropdowns
  getOptions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  uploadPastpaper(formData: any, file: File): Observable<any> {
    const formDataObj = new FormData();
    formDataObj.append('year', formData.year);
    formDataObj.append('subject_id', formData.subject_id);
    formDataObj.append('season', formData.season);
    formDataObj.append('paper_type', formData.paper_type);
    formDataObj.append('file', file, file.name);

    // Ensure the URL does not have double slashes
    return this.http.post(`${this.apiUrl}/pastpapers`, formDataObj);
}

  // Method to fetch all past papers from the API
  getAllPastpapers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

}
