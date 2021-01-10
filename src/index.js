/**
 * Badging for PWA app icons
 *
 * The App Badging API allows installed web apps to set an application-wide badge on the app icon.
 *
 * In some cases, the OS may not allow the exact representation of the badge.
 * In such cases, the browser will attempt to provide the best representation for that device.
 * For example, because the Badging API isn't supported on Android, Android only ever shows a dot instead of a numeric value.
 *
 * @class
 * @namespace PWABadge
 * @example Sync Set Badge.
 * const AppBadge = new PWABadge();
 * AppBadge.syncSetBadge(10)
 * @example Async Set Badge
 * const AppBadge = new PWABadge();
 * AppBadge.asyncSetBadge(10).then(() => {
 *   // Do something...
 * }).catch(e => {
 *   // Do something with the error.
 * })
 * @example Sync Clear Badge value
 * const AppBadge = new PWABadge();
 * AppBadge.syncClearBadge()
 * @example Async Clear Badge value
 * AppBadge.asyncClearBadge().then(() => {
 *   // Do something...
 * }).catch(e => {
 *   // Do something with the error.
 * })
 */
class PWABadge {
  constructor() {
    /**
     * @private
     * @type        {Navigator}
     * @description A Clone of navigator object
     */
    this.__navigator = window.navigator;
    /**
     * @private
     * @type        {Window}
     * @description A Clone of window object
     */
    this.__window = window;
  }

  /**
   * Check the Browser Badge feature supports
   *
   * @memberof  PWABadge
   * @return    {boolean} Return true if the browser supports the Badge feature and returns false if not.
   */
  isSupported() {
    const n = ['setBadge', 'setExperimentalBadge', 'setClientBadge'];

    for (const key of n) {
      if (this.__navigator.hasOwnProperty(key)) return true;
    }

    return this.__window.hasOwnProperty('ExperimentalBadge');
  }

  /**
   * Wrapper to support first and second origin trial to compatible with the Browsers
   *
   * @private
   * @memberof  PWABadge
   * @see       https://web.dev/badging-api/
   * @see       https://github.com/w3c/badging/blob/master/docs/implementation.md
   * @returns   {Promise<void>} returns empty promise you can use for error handling
   */
  __innerSet(unreadCount) {
    if (this.__navigator.setBadge) {
      return this.__navigator.setBadge(unreadCount);
    } else if (this.__navigator.setExperimentalBadge) {
      return this.__navigator.setExperimentalBadge(unreadCount);
    } else if (this.__navigator.setClientBadge) {
      return this.__navigator.setClientBadge(unreadCount);
    } else if (this.__window.ExperimentalBadge) {
      return this.__window.ExperimentalBadge.set(unreadCount);
    }

    return Promise.reject();
  }

  /**
   * Sets the PWA App's badge.
   *
   * If a value is provided, set the badge to the provided value otherwise, display a plain white dot (or other flag as reprobate to the platform)
   * Don't assume anything about how the user agent displays the badge.
   * Some user agents may take a number like "4000" and rewrite it as "99+".
   * If you saturate the badge yourself (for example by setting it to "99") then the "+" won't appear.
   * No matter the actual number, just call setAppBadge(unreadCount) and let the user agent deal with displaying it accordingly.
   *
   * Setting number to `0` is the same as calling {@link syncClearBadge|this.syncClearBadge()}.
   *
   * @memberof    PWABadge
   * @param       {number} unreadCount - Unread Badge count
   * @returns     {void}   returns empty promise you can use for error handling
   */
  syncSetBadge(unreadCount) {
    try {
      this.__innerSet(unreadCount).catch((error) => {
        throw error;
      });
    } catch (e) {
      return e;
    }
  }

  /**
   * Sets the PWA App's badge.
   *
   * If a value is provided, set the badge to the provided value otherwise, display a plain white dot (or other flag as reprobate to the platform)
   * Don't assume anything about how the user agent displays the badge.
   * Some user agents may take a number like "4000" and rewrite it as "99+".
   * If you saturate the badge yourself (for example by setting it to "99") then the "+" won't appear.
   * No matter the actual number, just call setAppBadge(unreadCount) and let the user agent deal with displaying it accordingly.
   *
   * Setting number to `0` is the same as calling {@link syncClearBadge|this.syncClearBadge()}.
   *
   * @async
   * @memberof    PWABadge
   * @param       {number} unreadCount - Unread Badge count
   * @returns     {Promise<void>} returns empty promise you can use for error handling
   */
  async asyncSetBadge(count) {
    return this.__innerSet(count);
  }

  /**
   * Wrapper to support first and second origin trial to compatible with the Browsers
   *
   * @private
   * @memberof PWABadge
   * @see      https://web.dev/badging-api/
   * @see      https://github.com/w3c/badging/blob/master/docs/implementation.md
   * @returns  {Promise<void>} returns empty promise you can use for error handling
   */
  __innerClear() {
    if (this.__navigator.clearBadge) {
      return this.__navigator.clearBadge();
    } else if (this.__navigator.clearExperimentalBadge) {
      return this.__navigator.clearExperimentalBadge();
    } else if (this.__window.ExperimentalBadge) {
      return this.__window.ExperimentalBadge.clear();
    } else if (this.__navigator.clearClientBadge) {
      return this.__navigator.clearClientBadge();
    }

    return Promise.reject();
  }

  /**
   * Removes app's badge.
   *
   * @memberof PWABadge
   * @returns  {void} returns empty promise you can use for error handling
   */
  syncClearBadge() {
    try {
      this.__innerClear().catch((error) => {
        throw error;
      });
    } catch (e) {
      return e;
    }
  }

  /**
   * Removes app's badge.
   *
   * @async
   * @memberof PWABadge
   * @returns  {Promise<void>} returns empty promise you can use for error handling
   */
  async asyncClearBadge() {
    return this.__innerClear();
  }
}

export default PWABadge;
