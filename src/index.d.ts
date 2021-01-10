declare class PWABadge {
  private navigator: Navigator;
  private window: Window;

  /**
   * Check the Browser Badge feature supports
   *
   * @template Return true if the browser supports the Badge feature and returns false if not.
   */
  isSupported(): boolean;

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
   * @template Unread Badge count
   */
  syncSetBadge(unreadCount: number): void;

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
   * @template Unread Badge count
   */
  asyncSetBadge(unreadCount: number): Promise<void>;

  /**
   * Removes app's badge.
   */
  syncClearBadge(unreadCount: number): void;

  /**
   * Removes app's badge.
   */
  asyncClearBadge(): Promise<void>;
}

export default PWABadge;
