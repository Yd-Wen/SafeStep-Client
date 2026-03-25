# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **步步安 (SafeStep)**, a UniApp-based cross-platform mobile application for elderly fall detection and activity monitoring. It uses Vue 3 and targets multiple platforms including mobile apps and WeChat Mini Programs.

## Development Environment

This project is developed using **HBuilderX** as the primary IDE. There are no npm build scripts defined - compilation and running are handled through HBuilderX.

- **Framework**: UniApp with Vue 3
- **Styling**: SCSS with custom variables
- **Primary Color**: `#28C76F` (green)

## Project Structure

```
pages/           # Page components (each page has its own folder)
  ├── page-name/
  │   ├── page-name.vue    # Page component
  │   └── api.js           # Page-specific API functions
components/      # Reusable custom components (ssc-* prefix)
  ├── ssc-button-primary/  # Primary action button
  ├── ssc-title/           # Section title component
  ├── ssc-item-card/       # Card item component
  └── ...
utils/           # Utility functions
  ├── httpUtil.js          # HTTP request wrapper with token handling
  ├── timeUtil.js          # Date/time formatting (moment-timezone)
  ├── stringUtil.js        # Input validation (account, password)
  └── imageUtil.js         # Image processing and chart options
common/          # Shared styles
  ├── scss/self.scss       # Custom SCSS variables ($ssc-*)
  └── css/self.css         # Global CSS utilities
static/          # Static assets (images)
  ├── image/activity/      # Activity state images
  ├── image/avatar/        # User/device avatars
  ├── image/banner/        # Banner images
  └── image/tabbar/        # Tab bar icons
uni_modules/     # UniApp plugins
  ├── uni-icons/           # Icon components
  ├── uni-list/            # List components
  └── qiun-data-charts/    # Charting library
```

## Key Architecture Patterns

### API Organization
Each page has its own `api.js` file that imports from `utils/httpUtil.js`:

```javascript
import {http} from "@/utils/httpUtil.js"

export function someAPI(data) {
  return http({
    url: '/endpoint',
    method: 'POST',  // optional, defaults to GET
    data: data
  })
}
```

### HTTP Utility (`utils/httpUtil.js`)
- Base URL: `http://localhost:8080` (configurable)
- Automatically attaches `userToken` from storage to requests
- Shows loading indicator by default (pass `false` as second param to disable)
- Handles authentication expiration (code 900) by redirecting to login
- Automatically shows toast messages for success/error responses

### Custom SCSS Variables (`common/scss/self.scss`)
Project uses `$ssc-*` prefixed variables:
- Colors: `$ssc-color-primary` (#28C76F), `$ssc-color-risk`, `$ssc-color-warn`
- Text: `$ssc-font-size-title`, `$ssc-color-title`, etc.
- These are imported globally via `uni.scss`

### Component Naming
All custom components use `ssc-` prefix (SafeStep Client):
- `ssc-button-primary`, `ssc-button-default`, `ssc-button-warn`
- `ssc-title`, `ssc-banner`, `ssc-profile`
- `ssc-item-device`, `ssc-item-contact`, `ssc-item-card`, `ssc-item-alarm`
- `ssc-icon`, `ssc-logo`, `ssc-option`

### Navigation Patterns
- Standard navigation: `uni.navigateTo({url: '/pages/page-name/page-name'})`
- Tab switching: `uni.switchTab({url: '/pages/home/home'})`
- Redirect (replacing current page): `uni.redirectTo()`
- Relaunch (clearing stack): `uni.reLaunch()`

### State Management
Uses `uni.getStorageSync()` and `uni.setStorageSync()` for:
- `userInfo` - User profile data
- `userToken` - Authentication token

### WebSocket Usage
The status page uses WebSocket for real-time activity monitoring:
- Connection URL: `ws://localhost:8080/wsserver/{userCode}`
- Heartbeat messages sent every 5 seconds via timer

## Page Structure

The app has a 3-tab layout (home, status, user) plus additional pages:

| Page | Path | Description |
|------|------|-------------|
| Launch | `/pages/launch/launch` | App launch/splash screen |
| Login | `/pages/login/login` | User authentication |
| Register | `/pages/register/register` | User registration |
| Home | `/pages/home/home` | Dashboard with monitoring stats |
| Status | `/pages/status/status` | Real-time activity monitoring |
| User | `/pages/user/user` | User profile and settings |
| Device List | `/pages/list-device/list-device` | Manage connected devices |
| Contact List | `/pages/list-contact/list-contact` | Emergency contacts |
| Activity History | `/pages/history-activity/history-activity` | Past activity records |
| Alarm History | `/pages/list-alarm/list-alarm` | Fall detection alarms |

## Common Development Tasks

### Adding a New Page
1. Create folder in `pages/page-name/`
2. Create `page-name.vue` and `api.js`
3. Register in `pages.json` (add to pages array)
4. Follow existing patterns for imports and styling

### Using Custom Components
```vue
<template>
  <ssc-button-primary @click="handleClick" text="Confirm"/>
</template>
<script setup>
// Components are auto-registered by UniApp
</script>
```

### Making API Calls
```vue
<script setup>
import { someAPI } from './api.js'

async function fetchData() {
  const result = await someAPI({ param: value })
  if (result.code === 1) {
    // success
  }
}
</script>
```

### Styling Guidelines
- Use `rpx` units for responsive sizing (750rpx = full width)
- Use `$ssc-*` SCSS variables from `common/scss/self.scss`
- Scope page styles with `scoped` attribute
- Common pattern: `width: 710rpx; margin: 0 auto;` for container width

## Platform-Specific Notes

- **App-Plus**: Native app configuration in `manifest.json`
- **WeChat Mini Program**: Configured with appid in `manifest.json`
- **Vue 3**: Uses Composition API with `<script setup>` pattern
- **Image paths**: Use `/static/` prefix (e.g., `/static/image/app/welcome.png`)

## External Dependencies

- `moment` & `moment-timezone`: Date/time handling (Asia/Shanghai timezone default)
- `xmlhttprequest`: For non-browser environments
- `qiun-data-charts` (uni_modules): Chart visualization component

## Important Files

- `manifest.json` - App configuration, permissions, platform settings
- `pages.json` - Page routes, navigation bar config, tab bar setup
- `uni.scss` - Global SCSS variables (imports custom variables)
- `main.js` - App entry point (Vue 3 SSR app creation)
- `App.vue` - Root component with global styles
