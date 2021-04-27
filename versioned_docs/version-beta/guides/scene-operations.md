---
id: scene-operations
title: Scene and item operations
sidebar_label: Scene operations
---

import { CodeExamples, Example, Viewer } from '@site/src/components/CodeExamples';

In this guide, we'll demonstrate how to perform operations on a scene loaded into the viewer.
You can use these operations to hook up other UI controls and user interactions to modify the scene.

In the next guide, we'll demonstrate how to use user actions to perform scene
operations.

## Scene operations overview

Scene operations are used to modify the state of a loaded scene. Vertex's UI Components
expose a set of APIs that your application can use to describe scene mutations
and submitting an operation to Vertex's APIs to mutate the scene. The Viewer component
automatically handles the regeneration of an image with the updated scene.

To begin a scene operation, you'll need to retrieve a reference to the scene
through your target platform's viewer. The returned scene contains
methods that you can then use to describe scene operations you'd like to make.

When you're ready to perform the operation, call the returned builder's
`execute()`. This method returns an async task that completes when the operation
completes and the viewer has received a new image with the updated scene.

The following example demonstrates how to change the visibility of a part.

<CodeExamples>
<Example lang="js">

```js {16-20,23-31}
window.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const button = document.querySelector('#toggle-button');
  const viewer = document.querySelector('#viewer');
  const newScene = await newScene();

  const scene = await newScene
    .from('urn:vertexvis:eedc:file?externalId=my-file')
    .execute();

  await viewer.load(scene);

  let isHidden = false;
  button.addEventListener('click', () => {
    isHidden = !isHidden;
    toggleVisibility(viewer, 'item-name', isHidden);
  });
}

async function toggleVisibility(viewer, itemName, hide) {
  const scene = await viewer.scene();

  if (hide) {
    scene.show((s) => s.withMetadata('name', itemName)).execute();
  } else {
    scene.hide((s) => s.withMetadata('name', itemName)).execute();
  }
}
```

</Example>

<Example lang="xamarin">

```csharp {8,16,19-22,24-36}
using Vertexvis.Viewer.Common;
using Xamarin.Forms;

namespace Example
{
    public class ExampleViewer : ContentView
    {
        private bool IsHidden = false;

        public ExampleViewer()
        {
            InitializeComponent();
            Content = new Viewer();
            loadModel();

            Button.Clicked += OnButtonClicked;
        }

        private void OnButtonClicked() {
            IsHidden = !IsHidden;
            ToggleVisibility("item-name", IsHidden);
        }

        private async Task ToggleVisibility(String itemName, bool hide) {
            Scene scene = await viewer.Scene();

            if (hide) {
              scene.Items()
                  .Hide(s => selector.WithMetadata("name", itemName))
                  .Execute();
            } else {
              scene.Items()
                  .Show(s => selector.WithMetadata("name", itemName))
                  .Execute();
            }
        }

        private async Task LoadModel() {
            SceneBuilder newScene = await viewer.newScene();
            string scene = await newScene
                .From(Resource.FileByExternalId("my-file"))
                .Execute();
            await viewer.Load(scene);
        }
    }
}
```

</Example>

<Viewer src="/examples/scene-operations/overview.html"/>

</CodeExamples>

The scene operations expose a selector interface that's used to select items
that an operation should be performed on. You can select items by their ID or by
metadata that might be assigned to items in the CAD model.

<!-- See our [selector
docs][selectors] for the full API on selectors.-->

## Types of operations

The `Scene` exposes a set of operations that you can use to mutate a scene.
These operations are implemented as a fluid and chainable interface that allows
you to build up a set of operations to perform.

<CodeExamples>
<Example lang="js">

```js
scene
  .showOnly((s) => s.withMetadata('name', 'item-1'))
  .show((s) => s.withMetadata('name', 'item-2'))
  .highlight('#ff0000', (s) => s.withMetadata('name', 'item-3'))
  .execute();
```

</Example>

<Example lang="xamarin">

```csharp
scene.Items()
    .ShowOnly(s => s.WithMetadata("name", "item-1"))
    .Show(s => s.WithMetadata("name", "item-2"))
    .Highlight(new HexColor("#ff0000"), s => s.WithMetadata("name", "item-3"))
    .Execute();
```

</Example>
</CodeExamples>

### `showOnly(Selector)`

Performs an operation to hide all items in the scene except for the item
matching the given selector.

### `show(Selector)`

Performs an operation to show an item in the scene that matches the given
selector.

### `hide(Selector)`

Performs an operation to hide an item in the scene that matches the given
selector.

### `showAll()`

Performs an operation to show all items in the scene.

### `hideAll()`

Performs an operation to hide all items in the scene.

### `highlight(Color, Selector)`

Performs an operation to change the material color of an item that matches the
given selector.

### `clearAllHighlights()`

Performs an operation to reset the material color of all items in the scene.

## Summary

In this guide, you learned how to apply operations to a scene loaded in the
viewer. We explored the different types of scene operations and how they can
be combined to build up more complex operations.

<!--In the next guide, we'll explore [user interactions][./user-interactions.md] and how to
use these scene operations to mutate the scene based on detected user
interactions.
-->
