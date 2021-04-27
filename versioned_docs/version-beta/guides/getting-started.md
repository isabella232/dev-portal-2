---
id: getting-started
title: Getting started
---

The Vertex platform includes a set of APIs and UI Components, which together provide a powerful toolset for building scalable applications based on 3D data.

This site includes documentation for the APIs and UI Components, with guides and other references to help you get up and running quickly.

## APIs

APIs provide direct access to the cloud-based services that comprise the Vertex platform. Vertex provides the ability to import and collaborate with 3D data, author three-dimensional scene states, and stream interactive 3D views to multiple devices.

The APIs are primarily HTTP-based RESTful APIs with OAuth2 based authentication. Secure (TCP-based) WebSocket connections provide real-time streaming capabilities for viewing and analyzing large 3D datasets.

To get started, check out the [Authentication](./authentication) guide and [API Reference](/api/beta).

## UI Components

The following UI Components are actively developed and supported by Vertex.
They provide components and tools which simplify and accelerate the development of applications leveraging the Vertex platform.

These projects receive regular product updates and patches.

### [Web UI Components](../sdk/sdk-web)

The Web UI Components provide a lightweight and configurable client interface that can query, analyze, and render 3D data models and associated metadata. It features an interactive viewer component that is configurable and extensible. Because the cloud does all the heavy lifting, this client interface performs well across most device types, including mobile.

Languages: JavaScript/TypeScript

### [Xamarin UI Components](../sdk/sdk-xamarin)

The Xamarin UI Components wrap the Web UI Components, exposing all of the platform capabilities for use in building Xamarin applications which can be run on iOS, Android, and the Universal Windows Platform.

Languages: C#/JavaScript
