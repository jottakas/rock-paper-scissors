import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { RestResponse } from '../shared/interfaces/rest-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /** Utility for optional spinner */
  public evtBusy: EventEmitter<boolean> = new EventEmitter();

  /** Emits a request response */
  public evtRestResponse: EventEmitter<RestResponse<any>> = new EventEmitter();

  /** Queue of http requests */
  private requestQueue: string[] = [];

  constructor(private readonly httpClient: HttpClient) { }

  /**
   * HTTP Get
   * @param url request url
   * @returns correlation id of the request 
   */
  public get(url: string) {
    const requestId = uuid();
    this.requestQueue.push(requestId);

    this.emitBusyStatus();

    this.httpClient.get(url)
      .pipe(
        catchError(error => this.onErrorResponse(requestId, error))
      )
      .subscribe(data => this.onSuccessResponse(requestId, data));

    return requestId;
  }

  /**
   * Emits true if there are pending requests, false otherwise
   */
  private emitBusyStatus = () => {
    const isLoading = this.requestQueue.length > 0;
    this.evtBusy.emit(isLoading);
  }

  /**
   * Emits the response data
   * @param requestId Correlation id
   * @param data 
   */
  private onSuccessResponse = (requestId: string, data: any) => {
    this.requestQueue = this.requestQueue.filter(id => id !== requestId);
    this.evtRestResponse.emit({ requestId, data })
    this.emitBusyStatus();
  }

  /**
   * Handles the error response
   * @param requestId Correlation id
   * @param error HttpError
   * @returns The error response
   */
  private onErrorResponse = (requestId: string, error: HttpErrorResponse) => {
    const restResponse: RestResponse<any> = { requestId, error };

    this.requestQueue = this.requestQueue.filter(id => id !== requestId);
    this.evtRestResponse.emit({ requestId, error })
    this.emitBusyStatus();

    return of(restResponse);
  }
}
