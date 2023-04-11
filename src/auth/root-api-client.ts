import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder as ApiRoot } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import fetch from 'node-fetch';
import { Config, readConfig, Prefix } from '../utils/config';

const createRootApiClient = () => {
  const {
    clientId, clientSecret, projectKey, oauthHost, host,
  }: Config = readConfig(Prefix.DEV);

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    credentials: {
      clientId,
      clientSecret,
    },
    projectKey,
    host: oauthHost,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host,
    fetch,
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });
};

export const rootApiClient: ApiRoot = createRootApiClient();
