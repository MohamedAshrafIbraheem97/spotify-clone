// Application Classes
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface QueryParameterType {
  key: string;
  value: string;
}

@Injectable()
export class UrlBuilder {
  private static API_ENDPOINT: string = environment.base_url;
  private static API_MOCK_ENDPOINT: string = 'mock-domain/api';

  public static createUrl(
    endpoint: string,
    isMockAPI: boolean = false
  ): string {
    const baseUrl = isMockAPI ? this.API_MOCK_ENDPOINT : this.API_ENDPOINT;

    // final url
    return [baseUrl, endpoint].join('/');
  }

  public static createUrlWithQueryParameters(
    endpoint: string,
    queryParams: QueryParameterType[]
  ): string {
    let finalUrl = UrlBuilder.createUrl(endpoint, false);

    // formulate query params only if provided
    if (queryParams.length > 0) {
      finalUrl += this.formulateQueryParams(queryParams);
    }

    return finalUrl;
  }

  // formulate query params together
  private static formulateQueryParams(params: QueryParameterType[]) {
    let finalFormulatedParams: string = '?';
    // iterate over params to encode so that eliminate unwanted chars like # $ & and so on
    for (let i = 0; i < params.length; i++) {
      let value = encodeURIComponent(
        params[i].value + (i !== params.length - 1 ? '&' : '')
      );
      finalFormulatedParams += `${params[i].key}=${value}`;
    }

    return finalFormulatedParams;
  }

  // URL WITH PATH VARIABLES
  public static createUrlWithPathVariables(
    endpoint: string,
    pathVariables: any[] = []
  ): string {
    let finalUrl = UrlBuilder.createUrl(endpoint, false);

    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(
          pathVariable.toString()
        )}`;
      }
    }

    finalUrl += `${encodedPathVariablesUrl}`;

    return finalUrl;
  }
}
