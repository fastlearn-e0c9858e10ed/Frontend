import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PastpaperService {
  private apiUrl = environment.apiUrl +'pastpapers'; // Should resolve correctly


  constructor(private http: HttpClient) {}


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


}
