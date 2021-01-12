<div align="center">
	<p align="center">
		<img src="https://raw.githubusercontent.com/ali-master/pwa-badge/master/images/image.png" border="0" />
	</p>
	<h1 align="center">PWA Badge</h1>
	<p align="center">Like <b>Native Apps</b>, The PWA Badge API allows installed web apps to set an application-wide badge on the app icon.</p>

[![Travis CI](https://travis-ci.com/ali-master/pwa-badge.svg?branch=master)](https://travis-ci.com/ali-master/pwa-badge)
[![codecov](https://codecov.io/gh/ali-master/pwa-badge/branch/master/graph/badge.svg)](https://codecov.io/gh/ali-master/pwa-badge)
[![CodeFactor](https://www.codefactor.io/repository/github/ali-master/pwa-badge/badge)](https://www.codefactor.io/repository/github/ali-master/pwa-badge)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ali-master/pwa-badge/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg)](https://github.com/ali-master/pwa-badge/compare)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors-)
</div>
<hr />

The App Badge API allows installed web apps to set an application-wide badge,
shown in an operating-system-specific place associated with the application
(such as the shelf or home screen).

Badges tend to be more user-friendly than notifications and can be updated with
a much higher frequency since they don't interrupt the user. And, because they
don't interrupt the user, they don't need the user's permission.

> Keep in mind that to display the Badge count, Your **PWA** application should be installed on your Device.

### Possible use cases

Examples of sites that may use this Library includes:

- Chat, email, and social apps, to signal that new messages have arrived, or to
  show the number of unread items.
- Productivity apps, to signal that a long-running background task (such as
  rendering an image or video) has completed.
- Games, to signal that a player action is required (e.g., in Chess, when it is
  the player's turn).

### Usage

```bash
npm install --save pwa-badge
```

### The Badge API consists of five methods:

- `isSupported()` Check if the User's browser supports the Feature,
  and returns a `boolean` value that represents the Status of supporting.
- `syncSetBadge(unreadCount)` Removes app's badge **Synchronously**. If a value
  is provided, set the badge to the provided value otherwise, display a plain
  white dot (or other flag as appropriate to the platform). Setting number to 0
  is the same as calling `syncClearBadge()` or `asyncClearBadge()`.
- `syncClearBadge()` Removes app's badge **Synchronously**.
- `asyncSetBadge(unreadCount)` This API is the same as `syncSetBadge()` but
  returns an empty `Promise` for error handling.
- `asyncClearBadge()` Removes app's badge **Asynchronously** and returns an
  empty `Promise` for error handling.

### Check Browser supports the Badge API

TL;DR `isSupported()` method function is an util for informing your users that
this feature supports by their `Browser` or `OS` and the `pwa-badge` library
`set` and `clear` the Badge count safely, and you can avoid using
`isSupported()` before calling the `set` or `clear` methods.

```js
import PWABadge from 'pwa-badge';

// Create an Instance
const badge = new PWABadge();

if (badge.isSupported()) {
  // Hoora!, Supports the Badge feature
} else {
  // Does not supports
}
```

### `Sync` Set and Clear Badge

```js
import PWABadge from 'pwa-badge';

// Create an Instance
const badge = new PWABadge();

// Set Badge unreadCount
badge.syncSetBadge(1);

// Clear Badge unreadCount
badge.syncClearBadge();
```

Result by calling `syncSetBadge`:

<div align="center">
	<p align="center">
		<img src="https://raw.githubusercontent.com/ali-master/pwa-badge/master/images/demo.png" border="0" />
	</p>
</div>

### `Async` Set and Clear Badge

`asyncSetBadge()` and `asyncClearBadge()` return empty `promises` you can
use for error handling.

```js
import PWABadge from 'pwa-badge';

// Create an Instance
const badge = new PWABadge();

// Set Badge unreadCount
badge
  .asyncSetBadge(1)
  .then(() => {
    // Badge count has shown as well
  })
  .catch((e) => {
    // The Browser not supporting the Badge feature or something went wrong
  });

// Clear Badge unreadCount
badge
  .asyncClearBadge()
  .then(() => {
    // Badge count has disappeared
  })
  .catch((e) => {
    // The Browser not supporting the Badge feature or something went wrong
  });
```

The App Badge API works on **Windows**, and **macOS**, in **Chrome 81 or
later**. It has also been confirmed to work on **Edge 84** or later. Support for
**Chrome OS** is in development and will be available in a future release of
Chrome. On **Android**, the Badge API is not supported. Instead, Android
automatically shows a badge on app icon for the installed web app when there is
an unread notification, just as for Android apps.

Some user agents may take a number like `4000` and rewrite it as `99+`. If you
saturate the badge yourself (for example by setting it to `99`) then the `+`
won't appear. No matter the actual number, just call `syncSetBadge()` or
`asyncSetBadge()` and let the user agent deal with displaying it accordingly.

While the App Badge API in Chrome requires an `installed app` as I wrote
before, you shouldn't make calls to the Badge API dependent on the
installation state. Just call the API when it `exists` and `installed` on a
device, as other browsers may show the badge in other places. If it works, it
works. If not, it simply doesn't.
