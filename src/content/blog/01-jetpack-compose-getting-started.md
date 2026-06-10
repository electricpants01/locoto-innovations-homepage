---
title: "Getting Started with Jetpack Compose"
description: "A practical guide to building your first Android UI with Jetpack Compose — the modern declarative toolkit that makes UI development simpler and more intuitive."
date: 2026-06-01
author: "Christian Torrico"
image: "https://images.unsplash.com/photo-1536148935331-408321065b18?auto=format&fit=crop&w=800&q=80"
tags: ["Kotlin", "Jetpack Compose", "Android", "UI"]
---

Jetpack Compose is Android's modern toolkit for building native UI. It simplifies and accelerates UI development on Android by using a declarative Kotlin API. If you're still writing XML layouts, it's time to make the switch.

## Why Jetpack Compose?

Before Compose, building Android UIs required a mix of XML layout files, View binding, and a lot of boilerplate code. Every UI interaction meant navigating between layout files and Kotlin/Java code. Compose changes all of that.

With Compose, your UI is defined entirely in Kotlin. You describe *what* your UI should look like, and Compose handles the rest. This leads to:

- **Less code** — no more XML, no more `findViewById()`
- **Intuitive state management** — UI automatically reacts to state changes
- **Powerful previews** — see your UI in Android Studio without running the app
- **Great interoperability** — works alongside your existing Views

## Your First Composable

Every UI element in Compose is a *composable function* — a regular Kotlin function annotated with `@Composable`.

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}
```

That's it. No XML, no `TextView`, no `setText()`. Just a function that describes what should appear on screen.

## Managing State

State in Compose is managed using `remember` and `mutableStateOf`. When state changes, Compose automatically recomposes only the affected parts of the UI.

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = "Count: $count", style = MaterialTheme.typography.headlineMedium)
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}
```

## Layouts in Compose

Compose provides powerful layout components out of the box:

- `Column` — arranges children vertically
- `Row` — arranges children horizontally
- `Box` — stacks children on top of each other
- `LazyColumn` / `LazyRow` — equivalent to `RecyclerView`, renders only visible items

```kotlin
@Composable
fun ProfileCard(name: String, role: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Person, contentDescription = null)
        Spacer(modifier = Modifier.width(16.dp))
        Column {
            Text(name, style = MaterialTheme.typography.titleMedium)
            Text(role, style = MaterialTheme.typography.bodyMedium, color = Color.Gray)
        }
    }
}
```

## Getting Started in Your Project

Add Compose to your existing Android project by updating your `build.gradle`:

```kotlin
android {
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.x"
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.activity:activity-compose")
}
```

## Final Thoughts

Jetpack Compose represents the future of Android UI development. Google has invested heavily in it, and the ecosystem is growing rapidly. If you're starting a new project, there's no reason not to use Compose from day one. For existing projects, you can migrate incrementally — Compose interoperates seamlessly with legacy Views.

The learning curve is real but shallow. Once you internalize the mental model of composable functions and state-driven UI, you'll never want to go back to XML.
