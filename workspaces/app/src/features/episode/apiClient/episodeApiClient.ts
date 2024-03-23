import { inject } from 'regexparam';

import type { GetEpisodeListRequestQuery } from '@wsh-2024/schema/src/api/episodes/GetEpisodeListRequestQuery';
import type { GetEpisodeListResponse } from '@wsh-2024/schema/src/api/episodes/GetEpisodeListResponse';
import type { GetEpisodeRequestParams } from '@wsh-2024/schema/src/api/episodes/GetEpisodeRequestParams';
import type { GetEpisodeResponse } from '@wsh-2024/schema/src/api/episodes/GetEpisodeResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type EpisodeApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetEpisodeRequestParams }, GetEpisodeResponse];
  fetchList: [{ query: GetEpisodeListRequestQuery }, GetEpisodeListResponse];
}>;

export const episodeApiClient: EpisodeApiClient = {
  fetch: async ({ params }) => {
    const response = await fetch(inject('/api/v1/episodes/:episodeId', params), {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetEpisodeResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))));
    return response;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/episodes/:episodeId`,
    ...options,
  }),
  fetchList: async ({ query }) => {
    const param = new URLSearchParams();
    if (query.bookId) param.append('bookId', query.bookId.toString());
    if (query.limit) param.append('limit', query.limit.toString());
    if (query.offset) param.append('offset', query.offset.toString());
    let url = `/api/v1/episodes`;
    if (param.toString()) url += `?${param.toString()}`;
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetEpisodeListResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))));
    return response;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/episodes`,
    ...options,
  }),
};
