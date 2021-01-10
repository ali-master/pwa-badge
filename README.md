<div align="center">
	<p align="center">
		<img src="https://raw.githubusercontent.com/ali-master/pwa-badge/master/images/image.png" border="0" />
	</p>
	<h1 align="center">PWA Badge</h1>
	<p align="center">The PWA Badge API allows installed web apps to set an application-wide badge on the app icon.</p>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ali-master/pwa-badge/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg)](https://github.com/ali-master/pwa-badge/compare)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors-)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)

</div>
<hr />

The App Badging API allows installed web apps to set an application-wide badge,
shown in an operating-system-specific place associated with the application
(such as the shelf or home screen).

Badges tend to be more user-friendly than notifications and can be updated with
a much higher frequency since they don't interrupt the user. And, because they
don't interrupt the user, they don't need the user's permission.

> Keep in mind that for using this library, Your PWA application should be
> installed before on your `OS` or `Mobile`.

### Possible use cases

Examples of sites that may use this Library includes:

- Chat, email, and social apps, to signal that new messages have arrived, or to
  show the number of unread items.
- Productivity apps, to signal that a long-running background task (such as
  rendering an image or video) has completed.
- Games, to signal that a player action is required (e.g., in Chess, when it is
  the player's turn).

The App Badging API works on Windows, and macOS, in Chrome 81 or later. It has
also been confirmed to work on Edge 84 or later. Support for Chrome OS is in
development and will be available in a future release of Chrome. On Android, the
Badging API is not supported. Instead, Android automatically shows a badge on
app icon for the installed web app when there is an unread notification, just as
for Android apps.

### Install

```bash
npm install --save pwa-badge
```

### The Badge API consists of five methods:

- `supports()` Check if the User's browser supports the PWA Badging feature, and
  returns a `boolean` value that represents the Status of supporting.
- `syncSetBadge(unreadCount)` Removes app's badge **Synchronously**. If a value
  is provided, set the badge to the provided value otherwise, display a plain
  white dot (or other flag as appropriate to the platform). Setting number to 0
  is the same as calling `syncClearBadge()`.
- `syncClearBadge()` Removes app's badge **Synchronously**.
- `asyncSetBadge(unreadCount)` This API is the same as `syncSetBadge()` but
  returns an empty `Promise` for error handling.
- `asyncSetBadge()` Removes app's badge **Asynchronously** and returns an empty
  `Promise` for error handling.

### Check Browser supports

```js
import PWABadge from 'pwa-badge';

const badge = new PWABadge();

if (PWABadge.isSupported()) {
  // Supports the Badge feature
} else {
  // Does not supports
}
```

### `Sync` Set and Clear Badge

```js
import PWABadge from 'pwa-badge';

const badge = new PWABadge();

// Set Badge unreadCount
PWABadge.syncSetBadge(1);

// Clear Badge unreadCount
PWABadge.syncClearBadge();
```

Result by calling `syncSetBadge`:

<div align="center">
	<p align="center">
		<img src="https://raw.githubusercontent.com/ali-master/pwa-badge/master/images/demo.png" border="0" />
	</p>
</div>

### `Async` Set and Clear Badge

```js
import PWABadge from 'pwa-badge';

const badge = new PWABadge();

// Set Badge unreadCount
PWABadge.asyncSetBadge(1)
  .then(() => {
    // Badge count has shown as well
  })
  .catch((e) => {
    // The Browser not supporting the Badge feature or something went wrong
  });

// Clear Badge unreadCount
PWABadge.asyncClearBadge()
  .then(() => {
    // Badge count has disapread
  })
  .catch((e) => {
    // The Browser not supporting the Badge feature or something went wrong
  });
```

### Notes

- Some user agents may take a number like `4000` and rewrite it as `99+`. If you
  saturate the badge yourself (for example by setting it to `99`) then the `+`
  won't appear. No matter the actual number, just call `syncSetBadge()` or
  `asyncSetBadge()` and let the user agent deal with displaying it accordingly.
- While the App Badging API in Chrome requires `an installed app`, you shouldn't
  make calls to the Badging API dependent on the installation state. Just call
  the API when it exists, as other browsers may show the badge in other places.
  If it works, it works. If not, it simply doesn't.

## Wallaby.js

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github)](https://wallabyjs.com/oss/)

This repository contributors are welcome to use
[Wallaby.js OSS License](https://wallabyjs.com/oss/) to get test results
immediately as you type, and see the results in your editor right next to your
code.
