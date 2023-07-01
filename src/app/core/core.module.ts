import { NgModule } from '@angular/core';
// modules
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// services
import { UrlBuilder } from './services/url-builder.service';
import { ApiHttpService } from './services/api-http.service';

@NgModule({
  declarations: [],
  providers: [ApiHttpService, UrlBuilder],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
