import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.css']
})
export class PdfviewerComponent {
  pdfUrl: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Retrieve the PDF URL from route parameters
    this.route.paramMap.subscribe(params => {
      const url = params.get('url');
      if (url) {
        // Decode the URL if necessary
        const decodedUrl = decodeURIComponent(url);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(decodedUrl);
      }
    });
  }
}
