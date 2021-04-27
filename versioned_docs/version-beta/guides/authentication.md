---
id: authentication
title: Authentication
---

## API access

Vertex APIs use the [OAuth 2.0 Client Credentials](https://tools.ietf.org/html/rfc6749#section-4.4) flow
to authenticate and authorize all API requests. From a high level, the flow includes these three steps:

1. Your app makes a secure HTTP call to an OAuth Authorization API (REST endpoint), providing its application credentials.
1. An access token is returned to your app.
1. When making subsequent HTTP calls to various APIs on the platform, your app includes the access token in a request header.

![Client Credentials Sequence Diagram](/img/oauth-client-credentials-flow-sequence.svg 'Client Credentials Sequence Diagram')

<!-- DIAGRAM SOURCE: https://www.lucidchart.com/invitations/accept/979b8338-ac0c-4775-bd49-24a616307ef7 -->

:::note

The following instructions assume that you are an existing Vertex platform customer with an established developer account. If you do not already have application credentials, please contact your Customer Success Manager or contact [Vertex Support](../support).

If you'd like to sign up for a free developer account, please contact [Vertex Support](../support).
:::

## Using access tokens

Use your application credentials to fetch an access token for use with API calls. You can accomplish this by making a call to the token endpoint. In a production application,
this is normally facilitated by a backend service with protected access to the application credentials. As a best
practice, you should never hardcode your application credentials directly within a user-facing client application. For
testing purposes, you can manually obtain a token with a `curl` script or similar, as demonstrated in the examples below.

The authorization API uses the HTTP basic access authentication method, leveraging your application credentials. In basic
HTTP authentication, a request contains a header field in the form of `Authorization: Basic {credentials}`, where
_credentials_ is the base64 encoding of your `CLIENT_ID` and `CLIENT_SECRET` joined by a single colon `:`.

Before you can issue the `curl` command for obtaining a token, you need to base64 encode your credentials for
authentication. To generate a valid encoded `{credentials}` string, you can issue the following command within most
linux-based environments, including OSX:

```
echo -n '{CLIENT_ID}:{SECRET}' | base64
```

Next, use your encoded `{credentials}` string and make the actual call to obtain an access token:

```
curl --request POST \
  --url https://rest-api.prod.vertexvis.io/rest/api/oauth2/token \
  --header 'authorization: Basic {credentials}' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials
```

This will return a response similar to the following:

```
{
  "access_token": "{access_token}",
  "token_type": "bearer"
}
```

The returned access token is valid for one hour by default and should be included as the value for the `credentials-token`
attribute for the embedded viewer, or in the `Authorization` header in subsequent API calls as a bearer token:

```
curl --request GET \
  --url https://rest-api.prod.vertexvis.io/rest/api/{ENDPOINT} \
  --header 'authorization: Bearer {ACCESS_TOKEN}' \
  --header 'x-api-key: {CLIENT_ID}'
```

Further information about this feature can be found within [OAuth's documentation](https://oauth.net/2/bearer-tokens/).
