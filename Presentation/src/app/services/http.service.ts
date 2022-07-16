import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject, tap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { environment } from '../../environments/environment';
import { RestResponse } from '../shared/interfaces/rest-response.interface';
import { RestEndpointWithAction } from '../shared/interfaces/rest-url-action.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  protected readonly apiUrl: string = '<empty base url>';

  /** Utility for optional spinner */
  public evtBusy$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /** Emits a request response */
  public evtRestResponse$: BehaviorSubject<RestResponse<any>> = new BehaviorSubject({ requestId: 'init', action: 'init' });

  /** Queue of http requests */
  private requestQueue: string[] = [];

  constructor(private readonly httpClient: HttpClient) { }

  /** If the string doesn't start with a slash, add it */
  private prependSlash = (value: string) => (value.startsWith('/') ? value : '/' + value);
  /** Builds an url joining the
   *   base url (localhost:8080)
   * + the controller api (controller)
   * + the desired endpoint (action)*/
  private buildUrl = (endpoint: string) => environment.baseUrl + this.prependSlash(this.apiUrl) + this.prependSlash(endpoint)

  /**
   * HTTP Get
   * @param endpoint endpoint of the request
   * @returns correlation id of the request
   */
  public get({ endpoint, action }: RestEndpointWithAction) {
    const requestId = uuid();
    this.requestQueue.push(requestId);

    this.emitBusyStatus();

    this.httpClient.get(this.buildUrl(endpoint))
      .pipe(
        map(data => this.onSuccessResponse(requestId, action, data)),
        catchError(error => this.onErrorResponse(requestId,  action, error))
      )
      .subscribe();

    return requestId;
  }

  /**
   * HTTP Post
   * @param endpoint endpoint of the request
   * @param data data to send on the body of the post request
   * @returns correlation id of the request
   */
  public post({ endpoint, action }: RestEndpointWithAction, data?: any) {
    const requestId = uuid();
    this.requestQueue.push(requestId);

    this.emitBusyStatus();

    this.httpClient.post(this.buildUrl(endpoint), data)
      .pipe(
        map(data => this.onSuccessResponse(requestId, action, data)),
        catchError(error => this.onErrorResponse(requestId, action, error))
      )
      .subscribe(this.emitBusyStatus);

    return requestId;
  }

  /**
   * Emits true if there are pending requests, false otherwise
   */
  private emitBusyStatus = () => {
    const isLoading = this.requestQueue.length > 0;
    this.evtBusy$.next(isLoading);
  }

  /**
   * Emits the response data
   * @param requestId Correlation id
   * @param data
   */
  private onSuccessResponse = (requestId: string, action: string, data: any) => {
    const restResponse: RestResponse<any> = { requestId, action, data };

    this.requestQueue = this.requestQueue.filter(id => id !== requestId);
    this.evtRestResponse$.next(restResponse);

    return restResponse;
  }

  /**
   * Handles the error response
   * @param requestId Correlation id
   * @param error HttpError
   * @returns The error response
   */
  private onErrorResponse = (requestId: string, action: string, error: HttpErrorResponse) => {
    const restResponse: RestResponse<any> = { requestId, action, error };

    this.requestQueue = this.requestQueue.filter(id => id !== requestId);
    this.evtRestResponse$.next(restResponse)

    return of(restResponse);
  }
}
