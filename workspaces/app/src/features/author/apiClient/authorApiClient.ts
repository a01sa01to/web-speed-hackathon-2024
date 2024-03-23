import { inject } from 'regexparam';

import type { GetAuthorListRequestQuery } from '@wsh-2024/schema/src/api/authors/GetAuthorListRequestQuery';
import type { GetAuthorListResponse } from '@wsh-2024/schema/src/api/authors/GetAuthorListResponse';
import type { GetAuthorRequestParams } from '@wsh-2024/schema/src/api/authors/GetAuthorRequestParams';
import type { GetAuthorResponse } from '@wsh-2024/schema/src/api/authors/GetAuthorResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type AuthorApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetAuthorRequestParams }, GetAuthorResponse];
  fetchList: [{ query: GetAuthorListRequestQuery }, GetAuthorListResponse];
}>;

export const authorApiClient: AuthorApiClient = {
  fetch: async ({ params }) => {
    const response = await fetch(inject('/api/v1/authors/:authorId', params), {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetAuthorResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))));
    return response;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/authors/:authorId`,
    ...options,
  }),
  fetchList: async ({ query }) => {
    const param = new URLSearchParams();
    if (query.limit) param.append('limit', query.limit.toString());
    if (query.name) param.append('name', query.name);
    if (query.offset) param.append('offset', query.offset.toString());
    let url = `/api/v1/authors`;
    if (param.toString()) url += `?${param.toString()}`;

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetAuthorListResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))));
    return response;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/authors`,
    ...options,
  }),
};
