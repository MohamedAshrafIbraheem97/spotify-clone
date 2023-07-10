import { Component, OnInit } from '@angular/core';

// application endpoints
import { ENDPOINTS } from './data/Constants/endpoints';

// Application Services
import { UrlBuilder } from './core/services/url-builder.service';
import { ApiHttpService } from './core/services/api-http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'spotify-clone';

  constructor(
    private apiHttpService: ApiHttpService,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'nl', 'ar']);
    translate.setDefaultLang('ar');
  }
  ngOnInit() {
    console.log(UrlBuilder.createUrl(ENDPOINTS.POSTS.allPosts));
    console.log(
      UrlBuilder.createUrlWithQueryParameters('comments', [
        { key: 'postId', value: '1' },
      ])
    );
    console.log(UrlBuilder.createUrlWithPathVariables('posts', ['1']));

    this.apiHttpService
      .get(UrlBuilder.createUrl(ENDPOINTS.POSTS.allPosts))
      .subscribe((post) => {
        console.log(post);
      });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
