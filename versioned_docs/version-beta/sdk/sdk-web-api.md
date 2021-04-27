---
id: sdk-web-api
title: Viewer component API
sidebar_label: Viewer component API
---

## Properties

| Property                  | Attribute               | Description                                                                                                                                                                                                                                                                                    | Type                                                        | Default     |
| ------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------- |
| `cameraControls`          | `camera-controls`       | The default mouse and touch interactions provided by the viewer. Can be enabled (default) or disabled.                                                                                                                                                                                         | `boolean`                                                   | `true`      |
| `config`                  | `config`                | An object or JSON encoded string that defines configuration settings for the viewer.                                                                                                                                                                                                           | `Config \| string`                                          | `undefined` |
| `credentials`             | `credentials`           | A `Credentials` object or JSON encoded string of a `Credentials` object. The viewer must set this property or a combination of `credentialsClientId`, `credentialsToken` and `credentialsApiKey`. This property takes precedence.                                                              | `ApiKey \| BearerToken \| Oauth2 \| Unauthorized \| string` | `undefined` |
| `credentialsApiKey`       | `credentials-api-key`   | The api key for a user token credentials flow.                                                                                                                                                                                                                                                 | `string`                                                    | `undefined` |
| `credentialsClientId`     | `credentials-client-id` | The client ID for an OAuth 2 credentials flow. `credentialsToken` must also be set.                                                                                                                                                                                                            | `string`                                                    | `undefined` |
| `credentialsToken`        | `credentials-token`     | The token for an OAuth 2 credentials flow. Property is ignored if `credentialsClientId` has not been set.                                                                                                                                                                                      | `string`                                                    | `undefined` |
| `httpClient` _(required)_ | --                      |                                                                                                                                                                                                                                                                                                | `(request: HttpRequest) => Promise<HttpResponse>`           | `undefined` |
| `model`                   | `model`                 | A URN of the model resource to load when the component is mounted in the DOM tree. The specified resource is a URN in one of the following formats: _ `urn:vertexvis:eedc:file:<fileid>` _ `urn:vertexvis:eedc:scenestate:<scenestateid>` \* `urn:vertexvis:eedc:file?externalId=<externalId>` | `string`                                                    | `undefined` |

## Events

| Event           | Description                                                                                                                                                                | Type                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `frameDrawn`    | Emits an event when a frame has been drawn to the viewer's canvas. The event includes details about the drawn frame, such as the `Scene` information related to the scene. | `CustomEvent<FrameAttributes>`  |
| `frameReceived` | Emits an event when a frame has been received by the viewer. The event includes details about the drawn frame, such as the `Scene` information related to the scene.       | `CustomEvent<FrameAttributes>`  |
| `pick`          | Emits an event whenever the user performs a pick operation. The event includes the `HitResult`s of the pick and any keyboard keys that were pressed.                       | `CustomEvent<PickEventDetails>` |
| `tokenExpired`  | Emits an event when a provided OAuth 2 token is expired, or is about to expire, causing issues with establishing a WebSocket connection, or performing API calls.          | `CustomEvent<void>`             |

## Methods

### `getFrameAttributes() => Promise<FrameAttributes>`

#### Returns

Type: `Promise<FrameAttributes>`

### `getInteractionHandlers() => Promise<InteractionHandler[]>`

#### Returns

Type: `Promise<InteractionHandler[]>`

### `load(resource: string) => Promise<void>`

Loads the given resource into the viewer and returns a `Promise` that
resolves when the scene is loaded. The specified resource is a URN in
one of the following formats:

- `urn:vertexvis:eedc:file:<fileid>`
- `urn:vertexvis:eedc:scenestate:<scenestateid>`
- `urn:vertexvis:eedc:file?externalId=<externalId>`

#### Returns

Type: `Promise<void>`

### `newScene() => Promise<SceneBuilder>`

Returns a `SceneBuilder` that is used to create a scene before viewing. A
`SceneBuilder` provides a fluent interface to specify what file or scene to
base the new scene off of, as well as operations to modify the new scene.

#### Returns

Type: `Promise<SceneBuilder>`

### `registerCommand<R, T>(id: string, factory: CommandFactory<R>, thisArg?: T) => Promise<Disposable>`

Internal API.

#### Returns

Type: `Promise<Disposable>`

### `registerInteractionHandler(interactionHandler: InteractionHandler) => Promise<Disposable>`

Registers and initializes an interaction handler with the viewer. Returns a
`Disposable` that should be used to deregister the interaction handler.

`InteractionHandler`s are used to build custom mouse and touch interactions
for the viewer. Use `<vertex-viewer camera-controls="false" />` to disable
the default camera controls provided by the viewer.

#### Returns

Type: `Promise<Disposable>`

### `scene() => Promise<Scene>`

Returns a `Scene` that contains methods for performing operations on the
loaded scene. If a scene has not been loaded, then this method throws
an exception.

#### Returns

Type: `Promise<Scene>`

## CSS custom properties

| Name           | Description                                              |
| -------------- | -------------------------------------------------------- |
| `--background` | The background color of the viewer. Defaults to #FFFFFF. |

---

_Built with [StencilJS](https://stenciljs.com/)_
