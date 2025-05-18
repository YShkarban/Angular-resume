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
  lang: string = 'en'; // Default language

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.lang);
  }

  downloadCV() {
    let link = document.createElement('a');
    link.download = 'CV.pdf';
    link.href = '../assets/CV.pdf';
    link.click();
  }

  toggleLanguage(): void {
    this.lang = this.lang === 'en' ? 'pl' : 'en'; // Toggle between 'en' and 'pl'
    this.translate.use(this.lang); // Switch language dynamically
  }
}
