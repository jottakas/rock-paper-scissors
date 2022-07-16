import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { delay, map, of, Subscription, throwError } from 'rxjs';
import { RestResponse } from '../shared/interfaces/rest-response.interface';
import { HttpService } from './http.service';
import { utils } from '../shared/util/utils';
import { environment } from '../../environments/environment';
import { testUtils } from '../shared/util/test-utils';
import { hot } from 'jasmine-marbles';
import { RestEndpointWithAction } from '../shared/interfaces/rest-url-action.interface';

describe('HttpService', () => {
  let service: HttpService;

  const subscriptions: Subscription[] = [];

  let getSpy: jasmine.Spy;
  let postSpy: jasmine.Spy;
  const BASE_URL = '<empty base url>';

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
    const mockEndpointWithAction: RestEndpointWithAction = { endpoint: 'mock url', action: 'mock action' };
    it('should call the get with the correct url', () => {
      service.get(mockEndpointWithAction);
      const expected = testUtils.buildUrl(BASE_URL, mockEndpointWithAction.endpoint)
      expect(getSpy).toHaveBeenCalledWith(expected);
    });

    it('should emit the busy status as true', () => {
      // Arrange
      getSpy.and.returnValue(of(true).pipe(delay(500)));

      // Act
      service.get(mockEndpointWithAction);

      // Assert
      const expected = hot('a', { a: true })
      expect(service.evtBusy$).toBeObservable(expected);
    });

    it('should emit the result', () => {
      // Arrange
      const mockData = 'mock data';
      getSpy.and.returnValue(of(mockData));

      // Act
      const requestId = service.get(mockEndpointWithAction);

      // Assert
      const expected = hot('a', { a: { requestId, action: mockEndpointWithAction.action, data: mockData } })
      expect(service.evtRestResponse$).toBeObservable(expected);
    });

    it('should emit the error when the request fails', () => {
      // Arrange
      const mockHttpError = new HttpErrorResponse({ error: 'Mock error' });
      getSpy.and.returnValue(of(false).pipe(map(() => { throw mockHttpError })))

      // Act
      const requestId = service.get(mockEndpointWithAction);

      // Assert
      const expected = hot('a', { a: { requestId, action: mockEndpointWithAction.action, error: mockHttpError } })
      expect(service.evtRestResponse$).toBeObservable(expected);
    });
  })
});
