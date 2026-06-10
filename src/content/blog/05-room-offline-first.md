---
title: "Building Offline-First Android Apps with Room"
description: "How to architect an offline-first Android app using Room for local persistence, combining it with network calls for a seamless user experience regardless of connectivity."
date: 2026-04-15
author: "Christian Torrico"
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
tags: ["Android", "Room", "Offline", "Architecture", "Kotlin"]
---

One of the most impactful decisions you can make for your Android app's user experience is designing it to work offline. Users in areas with poor connectivity, on airplanes, or simply in a spotty café WiFi shouldn't see error screens — they should see their data. This is the offline-first philosophy, and Room makes it remarkably achievable.

## What is Offline-First?

An offline-first app always reads data from the local cache and syncs with the remote server in the background. The key insight: **the local database is the single source of truth**.

```
User opens app
    ↓
Read from local Room database → Show data immediately
    ↓
Fetch from network in background
    ↓
Update Room database → UI automatically reflects changes (via Flow)
```

## Setting Up Room

Add to your `build.gradle.kts`:

```kotlin
dependencies {
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")
}
```

## Defining Entities and DAOs

```kotlin
// Entity — maps to a database table
@Entity(tableName = "articles")
data class ArticleEntity(
    @PrimaryKey val id: String,
    val title: String,
    val summary: String,
    val imageUrl: String,
    val publishedAt: Long,  // store as Unix timestamp
    val isBookmarked: Boolean = false
)

// DAO — Data Access Object
@Dao
interface ArticleDao {

    @Query("SELECT * FROM articles ORDER BY publishedAt DESC")
    fun getAllArticles(): Flow<List<ArticleEntity>>  // reactive!

    @Query("SELECT * FROM articles WHERE id = :id")
    suspend fun getArticleById(id: String): ArticleEntity?

    @Query("SELECT * FROM articles WHERE isBookmarked = 1")
    fun getBookmarkedArticles(): Flow<List<ArticleEntity>>

    @Upsert  // insert or update
    suspend fun upsertArticles(articles: List<ArticleEntity>)

    @Query("UPDATE articles SET isBookmarked = :bookmarked WHERE id = :id")
    suspend fun updateBookmark(id: String, bookmarked: Boolean)

    @Query("DELETE FROM articles WHERE isBookmarked = 0")
    suspend fun deleteNonBookmarkedArticles()
}
```

## Database Definition

```kotlin
@Database(
    entities = [ArticleEntity::class],
    version = 1,
    exportSchema = false
)
@TypeConverters(DateConverter::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun articleDao(): ArticleDao
}

// Type converter for complex types
class DateConverter {
    @TypeConverter
    fun fromTimestamp(value: Long?) = value?.let { Date(it) }

    @TypeConverter
    fun dateToTimestamp(date: Date?) = date?.time
}
```

With Hilt, provide the database as a singleton:

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase {
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            "app_database"
        ).fallbackToDestructiveMigration()
         .build()
    }

    @Provides
    fun provideArticleDao(db: AppDatabase) = db.articleDao()
}
```

## The Repository Pattern

The repository orchestrates between the network and the database:

```kotlin
class ArticleRepository @Inject constructor(
    private val dao: ArticleDao,
    private val api: NewsApi
) {

    // Single source of truth — always read from DB
    fun getArticles(): Flow<List<Article>> {
        return dao.getAllArticles().map { entities ->
            entities.map { it.toDomainModel() }
        }
    }

    // Sync function — fetch network, store in DB
    suspend fun refreshArticles(): Result<Unit> {
        return try {
            val networkArticles = api.fetchLatestArticles()
            dao.upsertArticles(networkArticles.map { it.toEntity() })
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun toggleBookmark(articleId: String, bookmarked: Boolean) {
        dao.updateBookmark(articleId, bookmarked)
    }
}
```

## ViewModel with Offline-First Logic

```kotlin
@HiltViewModel
class NewsViewModel @Inject constructor(
    private val repository: ArticleRepository
) : ViewModel() {

    val articles = repository.getArticles()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _isRefreshing = MutableStateFlow(false)
    val isRefreshing = _isRefreshing.asStateFlow()

    init {
        refresh()  // trigger initial sync on ViewModel creation
    }

    fun refresh() {
        viewModelScope.launch {
            _isRefreshing.value = true
            repository.refreshArticles()
                .onFailure { /* show error snackbar */ }
            _isRefreshing.value = false
        }
    }
}
```

## The Magic: Flow + Room

The beauty of this approach is that `dao.getAllArticles()` returns a `Flow`. When `refreshArticles()` calls `dao.upsertArticles()`, Room automatically notifies all active collectors. The UI updates without you writing a single UI-refresh call.

```kotlin
@Composable
fun NewsScreen(viewModel: NewsViewModel = hiltViewModel()) {
    val articles by viewModel.articles.collectAsStateWithLifecycle()
    val isRefreshing by viewModel.isRefreshing.collectAsStateWithLifecycle()

    PullToRefreshBox(
        isRefreshing = isRefreshing,
        onRefresh = { viewModel.refresh() }
    ) {
        LazyColumn {
            items(articles) { article ->
                ArticleCard(article)
            }
        }
    }
}
```

## Database Migrations

When you change your schema, Room needs migrations. Never use `fallbackToDestructiveMigration` in production:

```kotlin
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        database.execSQL(
            "ALTER TABLE articles ADD COLUMN category TEXT NOT NULL DEFAULT 'general'"
        )
    }
}

// In database builder
.addMigrations(MIGRATION_1_2)
```

Offline-first apps feel premium. Users notice when an app works without internet — and they remember it. Room, combined with Kotlin Flow and the repository pattern, makes this architecture achievable without heroics.
