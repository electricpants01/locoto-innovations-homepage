---
title: "Clean Architecture in Android: A Practical Guide"
description: "Learn how to structure your Android app using Clean Architecture principles — separating concerns into layers that are testable, scalable, and maintainable."
date: 2026-05-20
author: "Christian Torrico"
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
tags: ["Android", "Architecture", "Clean Architecture", "MVVM"]
---

After years of building Android apps, I've seen codebases that are a joy to work in — and ones that are a nightmare. The difference almost always comes down to architecture. Clean Architecture, originally proposed by Robert C. Martin (Uncle Bob), is the approach I reach for on every serious Android project.

## The Core Idea

Clean Architecture organizes your code into concentric layers, where each layer has a specific responsibility and can only depend on layers below it:

```
┌─────────────────────────────┐
│     Presentation Layer      │  ← ViewModels, Compose UI
├─────────────────────────────┤
│       Domain Layer          │  ← Use Cases, Entities
├─────────────────────────────┤
│        Data Layer           │  ← Repositories, Data Sources
└─────────────────────────────┘
```

The key rule: **inner layers know nothing about outer layers**. Your domain layer doesn't know whether data comes from a REST API or a local database. Your UI doesn't know how data is fetched — it just calls use cases.

## The Domain Layer

This is the heart of your application. It contains:

- **Entities** — core business models (pure Kotlin, no Android imports)
- **Use Cases** — single business operations (e.g., `GetUserProfileUseCase`)
- **Repository interfaces** — abstractions that the data layer implements

```kotlin
// Entity — pure Kotlin
data class UserProfile(
    val id: String,
    val name: String,
    val email: String,
    val avatarUrl: String?
)

// Use Case
class GetUserProfileUseCase(
    private val userRepository: UserRepository
) {
    suspend operator fun invoke(userId: String): Result<UserProfile> {
        return userRepository.getUserById(userId)
    }
}

// Repository interface (defined in domain, implemented in data)
interface UserRepository {
    suspend fun getUserById(userId: String): Result<UserProfile>
}
```

Notice: no Android imports. This code could run on any platform.

## The Data Layer

The data layer implements the repository interfaces defined in domain:

```kotlin
class UserRepositoryImpl(
    private val remoteDataSource: UserRemoteDataSource,
    private val localDataSource: UserLocalDataSource
) : UserRepository {

    override suspend fun getUserById(userId: String): Result<UserProfile> {
        return try {
            // Try remote first, fall back to cache
            val remoteUser = remoteDataSource.fetchUser(userId)
            localDataSource.saveUser(remoteUser)
            Result.success(remoteUser.toDomain())
        } catch (e: Exception) {
            // Return cached data if network fails
            val cachedUser = localDataSource.getUser(userId)
            if (cachedUser != null) Result.success(cachedUser.toDomain())
            else Result.failure(e)
        }
    }
}
```

## The Presentation Layer

The presentation layer uses ViewModels to expose UI state derived from use cases:

```kotlin
@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val getUserProfile: GetUserProfileUseCase
) : ViewModel() {

    private val _uiState = MutableStateFlow<ProfileUiState>(ProfileUiState.Loading)
    val uiState: StateFlow<ProfileUiState> = _uiState.asStateFlow()

    fun loadProfile(userId: String) {
        viewModelScope.launch {
            _uiState.value = ProfileUiState.Loading
            getUserProfile(userId)
                .onSuccess { profile ->
                    _uiState.value = ProfileUiState.Success(profile)
                }
                .onFailure { error ->
                    _uiState.value = ProfileUiState.Error(error.message ?: "Unknown error")
                }
        }
    }
}

sealed class ProfileUiState {
    object Loading : ProfileUiState()
    data class Success(val profile: UserProfile) : ProfileUiState()
    data class Error(val message: String) : ProfileUiState()
}
```

## Why Bother?

I've worked on projects where everything was dumped into Activities and fragments. Adding a feature meant reading through 500-line files and praying nothing broke. With Clean Architecture:

1. **Easy to test** — use cases can be unit tested with no Android dependencies
2. **Easy to change** — swap the API library? Only change the data layer
3. **Easy to onboard** — new team members understand the structure immediately
4. **Feature scalability** — adding features doesn't touch unrelated code

## Folder Structure

Here's how I organize a Clean Architecture Android project:

```
app/
├── data/
│   ├── local/
│   │   ├── dao/
│   │   └── entity/
│   ├── remote/
│   │   ├── api/
│   │   └── dto/
│   └── repository/
├── domain/
│   ├── model/
│   ├── repository/       ← interfaces
│   └── usecase/
└── presentation/
    ├── ui/
    │   ├── profile/
    │   └── home/
    └── viewmodel/
```

Clean Architecture requires more upfront structure, but every hour you invest pays back tenfold as the project grows. Start with it from day one — you'll thank yourself later.
