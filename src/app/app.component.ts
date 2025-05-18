import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular_resume';

  // Define the type for language keys
  lang: 'en' | 'pl' = 'en'; // Default language

  // Define the type for pdfPaths
  private readonly pdfPaths: Record<'en' | 'pl', string> = {
    en: 'assets/pdf/Resume_YShkarban.pdf',
    pl: 'assets/pdf/CV_YShkarban.pdf',
  };

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.lang);
  }

  toggleLanguage(): void {
    this.lang = this.lang === 'en' ? 'pl' : 'en';
    this.translate.use(this.lang);
  }

  downloadCV(): void {
    const filePath = this.pdfPaths[this.lang]; // No error now

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`File not found: ${filePath}`);
        }
        return response.blob();
      })
      .then((blob) => this.downloadFile(blob, filePath))
      .catch((error) => console.error('Error downloading file:', error));
  }

  private downloadFile(blob: Blob, filePath: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.extractFileName(filePath);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private extractFileName(filePath: string): string {
    return filePath.split('/').pop() || 'download.pdf';
  }
}
