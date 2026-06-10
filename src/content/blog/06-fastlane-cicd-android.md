---
title: "Automating Android Releases with Fastlane"
description: "Stop manually uploading APKs and managing signing. Learn how to automate your entire Android build, test, and release pipeline using Fastlane — from beta distribution to Play Store."
date: 2026-04-01
author: "Christian Torrico"
image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
tags: ["Android", "Fastlane", "CI/CD", "DevOps", "Automation"]
---

Releasing an Android app used to be a tedious ritual: run tests, bump version code, build a signed APK, upload to the Play Console, fill in release notes, wait... Every release was manual, error-prone, and time-consuming. Fastlane changed all of that for me. Now a full release to the Play Store takes a single command.

## What is Fastlane?

Fastlane is an open-source automation tool for mobile app deployment. Written in Ruby, it provides a collection of *actions* that you combine into *lanes* — essentially scripts for your CI/CD pipeline. At FullStack Labs, it saved us hours per sprint.

## Installation

```bash
# Install via Homebrew (macOS)
brew install fastlane

# Or via Ruby gem
sudo gem install fastlane
```

Navigate to your Android project root and initialize:

```bash
cd /path/to/your/android/project
fastlane init
```

This creates a `fastlane/` folder with:
- `Fastfile` — your lane definitions
- `Appfile` — app-level configuration

## Basic Fastfile Structure

```ruby
# fastlane/Fastfile

default_platform(:android)

platform :android do

  # Run all tests
  lane :test do
    gradle(task: "test")
  end

  # Build and distribute a beta to testers
  lane :beta do
    increment_version_code(
      gradle_file_path: "app/build.gradle.kts"
    )
    gradle(
      task: "bundle",
      build_type: "Release",
      properties: {
        "android.injected.signing.store.file" => ENV["KEYSTORE_PATH"],
        "android.injected.signing.store.password" => ENV["KEYSTORE_PASSWORD"],
        "android.injected.signing.key.alias" => ENV["KEY_ALIAS"],
        "android.injected.signing.key.password" => ENV["KEY_PASSWORD"],
      }
    )
    upload_to_play_store(track: "internal")
  end

  # Full production release
  lane :release do
    test  # run tests first
    beta  # build and upload
    upload_to_play_store(
      track: "internal",
      track_promote_to: "production"
    )
    slack(
      message: "🚀 New production release deployed!",
      slack_url: ENV["SLACK_WEBHOOK"]
    )
  end

end
```

## Managing Secrets Securely

**Never hardcode credentials.** Use environment variables:

```bash
# .env (gitignored!)
KEYSTORE_PATH=/path/to/release.keystore
KEYSTORE_PASSWORD=your_keystore_password
KEY_ALIAS=your_key_alias
KEY_PASSWORD=your_key_password
PLAY_STORE_JSON_KEY=/path/to/api-key.json
SLACK_WEBHOOK=https://hooks.slack.com/...
```

Load them with the `dotenv` plugin:

```ruby
# Fastfile top
require 'dotenv'
Dotenv.load('.env')
```

## Auto-Incrementing Version Code

Version code must be unique for every Play Store upload. Automate it:

```ruby
lane :bump_version do
  current_code = google_play_track_version_codes(
    package_name: "com.yourcompany.app",
    track: "internal",
    json_key: ENV["PLAY_STORE_JSON_KEY"]
  ).max

  increment_version_code(
    gradle_file_path: "app/build.gradle.kts",
    version_code: current_code + 1
  )
end
```

## Firebase App Distribution for Beta Testing

For internal testing without going through the Play Store review:

```ruby
lane :firebase_beta do
  gradle(task: "assemble", build_type: "Debug")
  firebase_app_distribution(
    app: ENV["FIREBASE_APP_ID"],
    groups: "internal-testers, qa-team",
    release_notes: changelog_from_git_commits(commits_count: 10),
    firebase_cli_token: ENV["FIREBASE_TOKEN"]
  )
end
```

## GitHub Actions Integration

The real power comes when Fastlane runs automatically on CI. Here's a GitHub Actions workflow:

```yaml
# .github/workflows/android-release.yml
name: Android Release

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true

      - name: Decode Keystore
        run: |
          echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 --decode > release.keystore

      - name: Run Fastlane Beta
        env:
          KEYSTORE_PATH: release.keystore
          KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
          PLAY_STORE_JSON_KEY: ${{ secrets.PLAY_STORE_JSON_KEY }}
        run: bundle exec fastlane beta
```

## Screenshot Automation

One of Fastlane's killer features — automate Play Store screenshot generation:

```ruby
lane :screenshots do
  capture_android_screenshots(
    locales: ["en-US", "es-ES"],
    clear_previous_screenshots: true
  )
  upload_to_play_store(
    skip_upload_apk: true,
    skip_upload_aab: true
  )
end
```

## The Workflow at FullStack Labs

At FullStack Labs, our release workflow was:

1. Developer merges PR to `main` → GitHub Actions triggers `fastlane test`
2. Every Friday → `fastlane firebase_beta` distributes to QA
3. After QA approval → `fastlane release` promotes to production
4. Slack notification fires automatically

Zero manual steps. Zero forgotten version bumps. Zero unsigned builds making it to production.

If you're still doing manual releases, start with Fastlane today. Even just automating the build and signing process is a huge win. The full CI/CD setup takes an afternoon and pays for itself in the first sprint.
