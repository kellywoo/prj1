import {httpClient} from '@app/util/http-client';
import {Observable} from 'rxjs';

const url = 'https://api.unsplash.com/search/photos';
class ApiService {
  getQuery (key = ''): Observable<any>{
    return httpClient.get(url, {
        headers: {
          Authorization:
            'Client-ID 8a1eeb1b22eb324fe870d7e256bea4289de509b37a17b55d2aca0629baaf1cb0',
        },
        params: {
          query: key,
        },
      })
  }
}

export const apiService = new ApiService();
