import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { delay, map, of, Subscription, throwError } from 'rxjs';
import { RestResponse } from '../shared/interfaces/rest-response.interface';
import { HttpService } from './http.service';
import { utils } from '../shared/util/utils';

describe('HttpService', () => {
  let service: HttpService;

  const subscriptions: Subscription[] = [];

  let getSpy: jasmine.Spy;
  let postSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    const httpClient = TestBed.inject(HttpClient);
    getSpy = spyOn(httpClient, 'get').and.returnValue(of({ data: 'mock data' }));
    postSpy = spyOn(httpClient, 'post');

    service = TestBed.inject(HttpService);
  });

  afterEach(() => {
    utils.unsubscribe(subscriptions)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.get(url)', () => {
    const mockUrl = 'mock url';
    it('should call the get with the correct url', () => {
      service.get(mockUrl);
      expect(getSpy).toHaveBeenCalledWith(mockUrl);
    });

    it('should emit the busy status as true', (fnDone) => {
      getSpy.and.returnValue(of(true).pipe(delay(500)))

      subscriptions.push(
        service.evtBusy.subscribe(isBusy => {
          expect(isBusy).toBeTrue();
          fnDone();
        })
      );

      service.get(mockUrl);
    });

    it('should emit the result', (fnDone) => {
      const mockHttpResponse = { data: 'mock data' };
      const expected: RestResponse<any> = { requestId: '', data: mockHttpResponse };

      getSpy.and.returnValue(of(mockHttpResponse).pipe(delay(500)))

      subscriptions.push(
        service.evtRestResponse.subscribe(restResponse => {
          expect(restResponse).toEqual(expected);
          fnDone();
        })
      );

      const requestId = service.get(mockUrl);
      expected.requestId = requestId;
    });

    it('should emit the error when the request fails', (fnDone) => {
      const mockHttpError = new HttpErrorResponse({ error: 'Mock error' });
      const expected: RestResponse<any> = { requestId: '', error: mockHttpError };

      getSpy.and.returnValue(of(false).pipe(delay(500), map(() => { throw mockHttpError })))

      subscriptions.push(
        service.evtRestResponse.subscribe(restResponse => {
          expect(restResponse).toEqual(expected);
          fnDone();
        })
      );

      const requestId = service.get(mockUrl);
      expected.requestId = requestId;
    });
  })
});
