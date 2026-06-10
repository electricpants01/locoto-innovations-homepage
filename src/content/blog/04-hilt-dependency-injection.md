---
title: "Dependency Injection in Android with Hilt"
description: "Everything you need to know about Hilt — Android's recommended DI framework. From basic setup to scoped components, constructor injection, and testing."
date: 2026-04-28
author: "Christian Torrico"
image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=800&q=80"
tags: ["Android", "Hilt", "Dependency Injection", "Kotlin"]
---

Dependency Injection (DI) is one of those concepts that sounds intimidating but becomes second nature once you understand the core idea: instead of creating your own dependencies, you receive them from the outside. Hilt is Google's opinionated DI library for Android, built on top of Dagger 2 but with significantly less boilerplate.

## Why Dependency Injection?

Imagine a `UserRepository` that needs a `UserApi` and a `UserDao`. Without DI:

```kotlin
class UserRepository {
    private val api = UserApi()           // hard-coded dependency
    private val dao = UserDao(database)   // tightly coupled
}
```

This is hard to test (how do you mock `UserApi`?), hard to configure (what if you need a different API in production vs testing?), and violates the Single Responsibility Principle.

With DI:

```kotlin
class UserRepository(
    private val api: UserApi,
    private val dao: UserDao
) { ... }
// Dependencies are injected — easy to test, easy to swap
```

## Setting Up Hilt

Add to your `build.gradle.kts`:

```kotlin
// In project-level build.gradle
plugins {
    id("com.google.dagger.hilt.android") version "2.51" apply false
}

// In app-level build.gradle
plugins {
    id("com.google.dagger.hilt.android")
    id("com.google.devtools.ksp")
}

dependencies {
    implementation("com.google.dagger:hilt-android:2.51")
    ksp("com.google.dagger:hilt-android-compiler:2.51")
}
```

Annotate your `Application` class:

```kotlin
@HiltAndroidApp
class MyApp : Application()
```

That's it for setup.

## Providing Dependencies

Hilt needs to know *how* to create each dependency. For classes you own, use `@Inject constructor`:

```kotlin
class UserRepository @Inject constructor(
    private val api: UserApi,
    private val dao: UserDao
) {
    suspend fun getUser(id: String) = api.fetchUser(id)
}
```

For third-party classes or interfaces, use `@Module` with `@Provides` or `@Binds`:

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    @Singleton
    fun provideRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://api.yourapp.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Provides
    @Singleton
    fun provideUserApi(retrofit: Retrofit): UserApi {
        return retrofit.create(UserApi::class.java)
    }
}

// Use @Binds to bind an interface to an implementation
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun bindUserRepository(
        impl: UserRepositoryImpl
    ): UserRepository
}
```

## Scopes

Scopes control how long an instance lives:

| Scope | Component | Lifetime |
|-------|-----------|---------|
| `@Singleton` | `SingletonComponent` | App lifetime |
| `@ActivityScoped` | `ActivityComponent` | Activity lifetime |
| `@ViewModelScoped` | `ViewModelComponent` | ViewModel lifetime |
| `@FragmentScoped` | `FragmentComponent` | Fragment lifetime |

Always match the scope to the minimum required lifetime.

## Injecting into ViewModels

Use `@HiltViewModel` to inject into ViewModels:

```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val getUserProfile: GetUserProfileUseCase,
    private val updateProfile: UpdateProfileUseCase
) : ViewModel() {

    private val _profile = MutableStateFlow<UserProfile?>(null)
    val profile = _profile.asStateFlow()

    fun loadProfile(userId: String) {
        viewModelScope.launch {
            getUserProfile(userId).onSuccess { _profile.value = it }
        }
    }
}
```

In your Compose UI, just use `hiltViewModel()`:

```kotlin
@Composable
fun ProfileScreen(
    viewModel: UserViewModel = hiltViewModel()
) {
    val profile by viewModel.profile.collectAsStateWithLifecycle()
    // ...
}
```

## Testing with Hilt

One of Hilt's best features is how easy it makes testing. Replace real implementations with fakes:

```kotlin
@HiltAndroidTest
class UserRepositoryTest {

    @get:Rule
    val hiltRule = HiltAndroidRule(this)

    @Inject
    lateinit var userRepository: UserRepository

    @Before
    fun init() {
        hiltRule.inject()
    }

    @Test
    fun `getUser returns user when API succeeds`() = runTest {
        val result = userRepository.getUser("123")
        assertTrue(result.isSuccess)
    }
}

// In test module, replace network with fake
@Module
@TestInstallIn(
    components = [SingletonComponent::class],
    replaces = [NetworkModule::class]
)
object FakeNetworkModule {
    @Provides
    @Singleton
    fun provideFakeUserApi(): UserApi = FakeUserApi()
}
```

Hilt eliminates so much boilerplate compared to raw Dagger that there's simply no reason not to use it on any new Android project. The investment in understanding DI pays dividends throughout the entire development lifecycle.
