import { environment } from '../../../environments/environment';

const prependSlash = (value: string) => (value.startsWith('/') ? value : '/' + value);

export const testUtils = {
    buildUrl: (apiUrl: string, endpoint: string) => environment.baseUrl + prependSlash(apiUrl) + prependSlash(endpoint)
}
