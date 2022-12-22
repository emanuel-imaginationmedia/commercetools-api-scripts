import { createApiBuilderFromCtpClient } from '@commercetools/importapi-sdk';
import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder as ImportApiClient } from '@commercetools/importapi-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import fetch from 'node-fetch';
import { Config, readConfig, Prefix } from '../utils/config';

const createImportApiClient = () => {
    const { clientId, clientSecret, projectKey, oauthHost, host }: Config = readConfig(Prefix.IMPORT);

    const authMiddlewareOptions: AuthMiddlewareOptions = {
        credentials: {
            clientId: clientId,
            clientSecret: clientSecret,
        },
        projectKey: projectKey,
        host: oauthHost,
        fetch: fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
        host: host,
        fetch: fetch,
    };

    const client = new ClientBuilder().withClientCredentialsFlow(authMiddlewareOptions).withHttpMiddleware(httpMiddlewareOptions).build();

    return createApiBuilderFromCtpClient(client).withProjectKeyValue({ projectKey: projectKey });
};

export const importApiClient: ImportApiClient = createImportApiClient();
