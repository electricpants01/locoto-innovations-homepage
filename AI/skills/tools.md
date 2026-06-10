# 🔧 Libraries & Tools Skills

Third-party libraries, tools, and platforms used by Christian Torrico in mobile development.

---

## Dependency Injection

### Hilt / Dagger ⭐⭐⭐⭐⭐ Expert
- **Hilt** — Android-specific DI built on top of Dagger 2 (recommended by Google)
- `@HiltAndroidApp`, `@AndroidEntryPoint`, `@HiltViewModel`
- `@Inject`, `@Provides`, `@Binds`, `@Module`
- Scopes: `@Singleton`, `@ActivityScoped`, `@ViewModelScoped`
- Testing: `HiltAndroidRule`

### Koin ⭐⭐⭐⭐ Advanced
- Lightweight DI for Kotlin (no annotation processing)
- DSL-based modules: `single`, `factory`, `viewModel`
- Used in smaller projects and KMP scenarios

---

## Backend & Cloud

### Firebase ⭐⭐⭐⭐⭐ Expert

| Service | Usage |
|---------|-------|
| **Crashlytics** | Crash reporting and stability monitoring |
| **Analytics** | Event tracking and user behavior |
| **Firestore** | NoSQL real-time database |
| **Authentication** | Email, Google, social login |
| **Cloud Messaging (FCM)** | Push notifications |
| **Remote Config** | Feature flags and A/B testing |
| **App Distribution** | Beta distribution to testers |

**Used at:** Jalasoft (Android Developer role — Crashlytics + event logs for technician app)

---

## Local Persistence

### Room ⭐⭐⭐⭐⭐ Expert
- SQLite abstraction layer by Google/Jetpack
- `@Entity`, `@Dao`, `@Database`, `@TypeConverter`
- Flows from queries for reactive updates
- Migrations and schema versioning
- Testing with `in-memory` Room database

### SQLite ⭐⭐⭐⭐ Advanced
- Raw SQL queries when needed
- Used in early Android roles at Jalasoft

---

## Networking

### Retrofit ⭐⭐⭐⭐⭐ Expert
- Type-safe HTTP client for Android
- `@GET`, `@POST`, `@PUT`, `@DELETE`, `@PATCH`
- Coroutines support (suspend functions)
- Custom interceptors (auth headers, logging)
- Error handling with `Response<T>` and `Result`

### OkHttp ⭐⭐⭐⭐ Advanced
- HTTP & HTTP/2 client underlying Retrofit
- `Interceptor` for logging (HttpLoggingInterceptor)
- Custom retry logic
- Certificate pinning

### WebSockets ⭐⭐⭐⭐ Advanced
- Real-time bidirectional communication
- OkHttp WebSocket API
- Reconnection strategies
- Message parsing with JSON

**Used at:** FullStack Labs (real-time features)

---

## CI/CD & DevOps

### Fastlane ⭐⭐⭐⭐ Advanced
- Automated build, test, and deployment tool
- **Lanes:** `beta`, `release`, `screenshots`
- **Actions:** `gradle`, `upload_to_play_store`, `upload_to_testflight`
- Code signing automation (match)
- Slack notifications on build status

**Used at:** FullStack Labs — "Implemented CI/CD pipelines using Fastlane"

### Git / GitHub ⭐⭐⭐⭐⭐ Expert
- Git flow branching strategy
- PR reviews, code reviews
- GitHub Actions (basic workflows)
- Semantic versioning and tagging

### CI/CD Concepts ⭐⭐⭐⭐ Advanced
- Automated testing on pull requests
- Build artifact management
- Multi-environment deployments (dev, staging, prod)
- App signing and release automation

---

## Maps & Location

### OpenStreetMap ⭐⭐⭐ Intermediate
- Open-source map tiles
- Integration via react-native-maps
- Location markers, overlays, polylines
- Used for employee location verification in WorkTime Tracker

---

## Website Display (Tailwind Colors)

```typescript
// In src/pages/index.astro skills array:
{ name: "Hilt / Dagger", color: "bg-red-500/20 text-red-300 border-red-500/30" },
{ name: "Firebase",      color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
{ name: "Room",          color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
{ name: "Retrofit",      color: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
{ name: "WebSockets",    color: "bg-lime-500/20 text-lime-300 border-lime-500/30" },
{ name: "Fastlane",      color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
{ name: "CI/CD",         color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
{ name: "Git",           color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
```
