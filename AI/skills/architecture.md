# 🏛️ Architecture & Patterns Skills

Software architecture patterns and design principles used by Christian Torrico in Android and mobile development.

---

## MVVM (Model-View-ViewModel) ⭐⭐⭐⭐⭐ Expert

**Primary architecture pattern used throughout career.**

- ViewModel + LiveData / StateFlow
- Separation of UI state from business logic
- Unidirectional data flow
- Repository pattern for data layer
- Integration with Jetpack (ViewModel, LiveData, Room)

```
UI Layer (Compose/View) ← ViewModel ← Repository ← DataSource (API/DB)
```

**Used at:** All Android roles

---

## Clean Architecture ⭐⭐⭐⭐⭐ Expert

**Layered architecture with strict separation of concerns.**

- **Presentation Layer:** UI + ViewModel
- **Domain Layer:** Use Cases / Interactors, pure Kotlin (no Android dependencies)
- **Data Layer:** Repositories, DataSources (Remote + Local)

```
Presentation → Domain → Data
     ↑                   ↓
  (depends on)      (implements)
  Domain interfaces  Domain interfaces
```

**Benefits applied:**
- Testable code (each layer independently testable)
- Independent of frameworks and UI
- Dependency Inversion Principle (DIP)
- Single Responsibility per layer

---

## MVI (Model-View-Intent) ⭐⭐⭐⭐ Advanced

**Reactive unidirectional architecture for complex UI states.**

- Single source of truth: `UiState` data class
- User actions as `Intent`/`Event` sealed classes
- State reducer function
- Side effects handling with `Channel`/`SharedFlow`

```
User Action → Intent → ViewModel → UiState → UI renders
```

---

## Coroutines ⭐⭐⭐⭐⭐ Expert

**Kotlin's native asynchronous programming solution.**

- `suspend` functions, `launch`, `async`, `await`
- Coroutine scopes: `viewModelScope`, `lifecycleScope`, custom `CoroutineScope`
- Dispatchers: `IO`, `Main`, `Default`, `Unconfined`
- Exception handling with `CoroutineExceptionHandler`
- Structured concurrency
- `withContext` for thread switching
- `supervisorScope` for parallel execution

---

## Kotlin Flow ⭐⭐⭐⭐⭐ Expert

**Reactive streams built on top of Coroutines.**

- `Flow`, `StateFlow`, `SharedFlow`
- Cold vs hot streams
- Operators: `map`, `filter`, `combine`, `flatMapLatest`, `debounce`, `distinctUntilChanged`
- `collectAsState()` in Jetpack Compose
- `callbackFlow` for converting callbacks to Flow
- `conflate` and `buffer` for backpressure handling

---

## SOLID Principles

Applied across all roles:

| Principle | Application |
|-----------|------------|
| **S** — Single Responsibility | Each class/function has one reason to change |
| **O** — Open/Closed | Extension via interfaces, not modification |
| **L** — Liskov Substitution | Proper use of inheritance and interfaces |
| **I** — Interface Segregation | Small, focused interfaces |
| **D** — Dependency Inversion | Depend on abstractions (interfaces), inject implementations |

---

## Website Display (Tailwind Colors)

```typescript
// In src/pages/index.astro skills array:
{ name: "MVVM",              color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
{ name: "Clean Architecture", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
{ name: "Coroutines",        color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
{ name: "Kotlin Flow",       color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
```
