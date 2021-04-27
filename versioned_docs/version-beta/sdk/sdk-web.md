---
id: sdk-web
title: Web UI Components introduction
sidebar_label: Web UI Components introduction
---

## Overview

The Web UI Components include a collection of standards-based [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that enable you to quickly build
customized applications powered by the Vertex platform. The JavaScript-based viewer component provides an ability to view, interact with, and analyze 3D data models through the platform. All the heavy lifting takes place server-side, enabling you to build performant applications using complex 3D data across all types of devices.

The web components are implemented in JavaScript, and the packages are shipped with TypeScript type definitions. They can be utilized within a variety of application environments that run within a browser engine. This includes standard web applications and iOS/Android mobile apps, as well as other embedded environments that offer a modern browser engine, such as WebKit. Both mouse and touch interactions are supported out of the box.

![Vertex 3D Viewer](/img/embedded-viewer-sample.png 'Vertex 3D Viewer')

## Browser compatibility

The web components are intended to work with most modern browsers, including those that support the Custom Elements v1
specification. For many browsers that do not support the Custom Elements v1 spec, a polyfill is automatically used.
See below for our complete browser support matrix:

| Edge | Chrome\* | Firefox\* | Safari 9+\* | Chrome Android\* | Mobile Safari\* |
| :--: | :------: | :-------: | :---------: | :--------------: | :-------------: |
|  ✓   |    ✓     |     ✓     |      ✓      |        ✓         |        ✓        |

\*Indicates the current version of the browser

The web components may work in older browsers, but require additional polyfills.
We cannot guarantee support for browsers outside of our compatibility matrix.

## Distribution

The Vertex Viewer component is distributed via [npm](https://www.npmjs.com/package/@vertexvis/viewer). For more information, see [Getting started with Web UI Components](sdk-web-getting-started).
