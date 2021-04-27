---
id: sdk-xamarin-getting-started
title: Getting started with Xamarin UI Components
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
Before you can start using the Vertex Xamarin UI Components, you will need some application credentials and an access token. You should also import data into the platform to use with the viewer.

For more information, see [Authentication](../guides/authentication) and [Importing Data](../guides/importing-data).
:::

## Installation

### NuGet

After adding the [Vertexvis.Viewer](https://www.nuget.org/packages/Vertexvis.Viewer/) package, the Viewer View component will
be available from the `Vertexvis.Viewer.Common` namespace. An instance of the Viewer can then be constructed through XAML, with
properties set through data binding, or through pure C# using the provided constructors.

<Tabs
defaultValue="csharp"
values={[
{ label: 'C#', value: 'csharp', },
{ label: 'XAML', value: 'xml', }
]
}>
<TabItem value="csharp">

```csharp
using Vertexvis.Viewer.Common;
using Xamarin.Forms;

namespace Example
{
    public class ExampleViewer : ContentView
    {
        public ExampleViewer()
        {
            InitializeComponent();

            Content = new Viewer();
        }
    }
}
```

</TabItem>
<TabItem value="xml">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ContentView
    xmlns="http://xamarin.com/schemas/2014/forms"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    xmlns:c="clr-namespace:Vertexvis.Viewer.Common;assembly=Vertexvis.Viewer.Common"
    x:Class="Example.ExampleViewer">
    <ContentView.Content>
        <c:Viewer
            x:Name="viewer"
            HorizontalOptions="FillAndExpand"
            VerticalOptions="FillAndExpand" />
    </ContentView.Content>
</ContentView>
```

</TabItem>
</Tabs>

## Loading a model

The first thing you'll want to do when working with the Viewer component is load a model. There are three primary ways
to reference and load a 3D model from Vertex. Models can be referenced by `fileId`, `externalId`, or by `sceneStateId`.
The following example code demonstrates loading with all three types of identifiers.

:::note
If you are using iOS or the Universal Windows Platform, additional setup is required after completing this setup
to load a model.

For details on how to prepare an iOS project to load a model, see [the iOS steps](#loading-a-model-ios).

For details on how to prepare a UWP project to load a model, see [the UWP steps](#loading-a-model-uwp).
:::

<Tabs
defaultValue="csharp"
values={[
{ label: 'C#', value: 'csharp', },
{ label: 'XAML', value: 'xml', }
]
}>
<TabItem value="csharp">

```csharp
using System.Threading.Tasks;
using Vertexvis.Viewer.Common;
using Vertexvis.Viewer.Common.Scenes;
using Vertexvis.Viewer.Common.Types;
using Xamarin.Forms;

namespace Example
{
    public class ExampleViewer : ContentView
    {
        private Viewer viewer;

        public ExampleViewer()
        {
            InitializeComponent();

            viewer = new Viewer
            {
                AuthToken = AuthToken.OAuth2("your-generated-token", "your-client-id")
            };

            Content = viewer;

            Task.Run(() => this.LoadModel());
        }

        private async Task LoadModel()
        {
            SceneBuilder sceneBuilder = await viewer.newScene();

            // Loads a model by a specified externalId. An external ID can be
            // assigned by you when uploading a file through our API.
            string scene = await sceneBuilder
              .From(Resource.FileByExternalId("your-external-id"))
              .Execute();

            // Loads a model by a Vertex fileId. You can retrieve the ID from the
            // Vertex app by navigating into an uploaded model and copying the ID
            // from the URL, e.g.
            // https://app.vertexvis.com/file/2c2410ee-6ab9-45ee-a80b-255f2e20160e
            scene = await sceneBuilder
              .From(Resource.File("your-file-id"))
              .Execute();

            // Loads a model by a sceneStateId. This approach can be used to load
            // a snapshot. The easiest way at the moment to get a snapshot's
            // scene state ID is by using the browser's dev tools to inspect the
            // network response for the  `GET /model_snapshot_versions` API call.
            scene = await sceneBuilder
              .From(Resource.SceneState("your-scene-state-id"))
              .Execute();

            await viewer.Load(scene);
        }
    }
}
```

</TabItem>
<TabItem value="xml">

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ContentView
    xmlns="http://xamarin.com/schemas/2014/forms"
    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
    xmlns:c="clr-namespace:Vertexvis.Viewer.Common;assembly=Vertexvis.Viewer.Common"
    x:Class="Example.ExampleViewer">
    <ContentView.Content>
        <c:Viewer
            x:Name="viewer"
            AuthToken={Binding AuthToken}
            HorizontalOptions="FillAndExpand"
            VerticalOptions="FillAndExpand" />
    </ContentView.Content>
</ContentView>
```

```csharp
// C# code-behind

using System.Threading.Tasks;
using Vertexvis.Viewer.Common.Scenes;
using Vertexvis.Viewer.Common.Types;
using Xamarin.Forms;

namespace Example
{
    public partial class ExampleViewer : ContentView
    {
        public Resource Resource { get; set; }
        public AuthToken AuthToken { get; set; }

        public ExampleViewer()
        {
            InitializeComponent();

            AuthToken = AuthToken.Oauth2("your-token", "your-client-id");

            Task.Run(() => this.LoadModel());
        }

        private async Task LoadModel()
        {
            SceneBuilder sceneBuilder = await viewer.newScene();

            // Loads a model by a specified externalId. An external ID can be
            // assigned by you when uploading a file through our API.
            string scene = await sceneBuilder
              .From(Resource.FileByExternalId("your-external-id"))
              .Execute();

            // Loads a model by a Vertex fileId. You can retrieve the ID from the
            // Vertex app by navigating into an uploaded model and copying the ID
            // from the URL, e.g.
            // https://app.vertexvis.com/file/2c2410ee-6ab9-45ee-a80b-255f2e20160e
            scene = await sceneBuilder
              .From(Resource.File("your-file-id"))
              .Execute();

            // Loads a model by a sceneStateId. This approach can be used to load
            // a snapshot. The easiest way at the moment to get a snapshot's
            // scene state ID is by using the browser's dev tools to inspect the
            // network response for the  `GET /model_snapshot_versions` API call.
            scene = await sceneBuilder
              .From(Resource.SceneState("your-scene-state-id"))
              .Execute();

            await viewer.Load(scene);
        }
    }
}
```

</TabItem>
</Tabs>

### Loading a model (iOS)

To load a model in an iOS application, you must also include
some of our WebView navigation handling. To do this, extend the `HybridWebViewNavigationDelegate`
class provided in the `Vertexvis.Viewer.iOS` namespace, as shown below:

```csharp
using System;
using Vertexvis.Viewer.iOS;

namespace Example.iOS
{
    public class HybridWebViewNavigationDelegateProxy : HybridWebViewNavigationDelegate
    {
        public HybridWebViewNavigationDelegateProxy(Action onPageLoad)
            : base(onPageLoad) { }
    }
}
```

### Loading a model (UWP)

To load a model in a UWP application, a supplementary [Vertexvis.Viewer.Uwp](https://www.nuget.org/packages/Vertexvis.Viewer.Uwp/)
NuGet package is required. This package should be added to the UWP project for the application, and the
Vertexvis.Viewer package should still be present in the common project.
