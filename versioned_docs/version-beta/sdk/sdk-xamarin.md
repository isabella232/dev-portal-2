---
id: sdk-xamarin
title: Xamarin UI Components introduction
sidebar_label: Xamarin UI Components introduction
---

## Overview

The Vertex Xamarin UI Components include a collection of [Xamarin Forms](https://dotnet.microsoft.com/apps/xamarin/xamarin-forms) Views that enable you to quickly embed a Viewer component into a Xamarin Forms cross-platform application. This Viewer component provides the ability to view, interact with, and analyze 3D models through the Vertex platform. All the heavy lifting takes place server-side, enabling you to build performant applications using complex 3D data across all types of devices.

The provided Views are implemented in Xamarin Forms, targeting the .NET Standard 2.0 framework. Additional platform-specific projects are included as part of the package, and provide support for Android and iOS through the [base Vertexvis.Viewer](https://www.nuget.org/packages/Vertexvis.Viewer/) package, and support for the Universal Windows Platform through a [supplementary Vertexvis.Viewer.Uwp](https://www.nuget.org/packages/Vertexvis.Viewer.Uwp/) package. See the [compatibility table](#framework-compatibility) for more details. The common Viewer component provides touch-based interactions out of the box, and provides a ViewerToolbar component with a tool for fitting the camera to the visible parts in a model.

![Vertex 3D Viewer](/img/xamarin-viewer-sample.png 'Vertex 3D Viewer')

## Framework compatibility

|                                   Package                                    |         Project          |                          Targeted Frameworks                           |
| :--------------------------------------------------------------------------: | :----------------------: | :--------------------------------------------------------------------: |
|     [Vertexvis.Viewer](https://www.nuget.org/packages/Vertexvis.Viewer/)     | Vertexvis.Viewer.Common  |                           .NET Standard 2.0                            |
|     [Vertexvis.Viewer](https://www.nuget.org/packages/Vertexvis.Viewer/)     |   Vertexvis.Viewer.iOS   |                                iOS 10+                                 |
|     [Vertexvis.Viewer](https://www.nuget.org/packages/Vertexvis.Viewer/)     | Vertexvis.Viewer.Android |                              Pie (v9.0)+                               |
| [Vertexvis.Viewer.Uwp](https://www.nuget.org/packages/Vertexvis.Viewer.Uwp/) |   Vertexvis.Viewer.Uwp   | uap10.0.16299<br/> uap10.0.17134<br/> uap10.0.17763<br/> uap10.0.18362 |

## Distribution

The Vertex Xamarin UI Components are distributed via [NuGet](https://www.nuget.org/packages?q=Vertexvis).
For more information, see [Getting Started with Xamarin UI Components](sdk-xamarin-getting-started).
