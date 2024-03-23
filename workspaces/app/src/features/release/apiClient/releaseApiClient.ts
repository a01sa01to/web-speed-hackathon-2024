import { inject } from 'regexparam';

import type { GetReleaseRequestParams } from '@wsh-2024/schema/src/api/releases/GetReleaseRequestParams';
import type { GetReleaseResponse } from '@wsh-2024/schema/src/api/releases/GetReleaseResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type ReleaseApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetReleaseRequestParams }, GetReleaseResponse];
}>;

export const releaseApiClient: ReleaseApiClient = {
  fetch: async ({ params }) => {
    const response = await fetch(inject('/api/v1/releases/:dayOfWeek', params), {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetReleaseResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to fetch'))));
    return response;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/releases/:dayOfWeek`,
    ...options,
  }),
};
