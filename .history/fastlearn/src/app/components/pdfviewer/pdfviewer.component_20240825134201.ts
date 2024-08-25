import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  pdfUrl: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const url = params.get('url');
      if (url) {
        const decodedUrl = decodeURIComponent(url);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(decodedUrl);
      }
    });
  }
}
