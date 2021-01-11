/* eslint-disable @typescript-eslint/no-empty-function */
import PWABadge from '../src/index.js';

function clearNavigator() {
  Object.defineProperty(window, 'navigator', {
    value: {},
    enumerable: true,
    writable: true,
    configurable: true,
  });
}

function clearWindow() {
  delete window.ExperimentalBadge;
}
let Badge;
describe('PWA Badge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
    clearNavigator();
    clearWindow();
    Badge = new PWABadge();
  });
  describe('Check isSupported by navigator and window methods', () => {
    it('Should be false', async () => {
      expect(Badge.isSupported()).toEqual(false);
      expect(Badge.syncSetBadge(10)).toBeUndefined();
      await expect(Badge.asyncSetBadge(10)).rejects.toBeUndefined();
    });
    it('Should be true By using setBadge', () => {
      Object.defineProperty(navigator, 'setBadge', {
        value: async (unreadCount) => {
          return await unreadCount;
        },
        enumerable: true,
      });
      expect(Badge.isSupported()).toBe(true);
    });

    it('Should be true By using setExperimentalBadge', () => {
      Object.defineProperty(navigator, 'setExperimentalBadge', {
        value: async (unreadCount) => {
          return await unreadCount;
        },
        enumerable: true,
      });
      expect(Badge.isSupported()).toBe(true);
    });

    it('Should be true By using setClientBadge', () => {
      Object.defineProperty(navigator, 'setClientBadge', {
        value: async (unreadCount) => {
          return await unreadCount;
        },
        enumerable: true,
      });
      expect(Badge.isSupported()).toBe(true);
    });

    it('Should be true By using window.ExperimentalBadge', () => {
      Object.defineProperty(window, 'ExperimentalBadge', {
        value: {
          set: async (unreadCount) => {
            return await unreadCount;
          },
        },
        enumerable: true,
      });
      expect(Badge.isSupported()).toBe(true);
    });
  });
  describe('Set and Clear Badge count by navigator.setBadge', () => {
    beforeEach(() => {
      if (!('setBadge' in window.navigator)) {
        Object.defineProperties(window.navigator, {
          setBadge: {
            value: async (unreadCount) => {
              return await unreadCount;
            },
            writable: true,
            enumerable: true,
          },
          clearBadge: {
            value: async () => {
              throw new Error('Something went wrong');
            },
            writable: true,
            enumerable: true,
          },
        });
      }
      jest.spyOn(window.navigator, 'setBadge');
      jest.spyOn(window.navigator, 'clearBadge');
    });

    it('[Sync] Should call navigator.setBadge', async () => {
      expect(Badge.syncSetBadge(10)).toBeUndefined();
      expect(window.navigator.setBadge).toHaveBeenCalledWith(10);
      expect(window.navigator.setBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.setBadge(10)).resolves.toEqual(10);
    });

    it('[Async] Should call navigator.setBadge', async () => {
      await expect(Badge.asyncSetBadge(10)).resolves.toBeDefined();
      expect(window.navigator.setBadge).toHaveBeenCalledWith(10);
      expect(window.navigator.setBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.setBadge(10)).resolves.toEqual(10);
    });

    it('[Sync] Should call navigator.clearBadge', async () => {
      expect(Badge.syncClearBadge()).toBeUndefined();
      expect(window.navigator.clearBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.clearBadge()).rejects.toThrowError(
        'Something went wrong',
      );
    });

    it('[Async] Should call navigator.clearBadge', async () => {
      await expect(Badge.asyncClearBadge()).rejects.toThrowError(
        'Something went wrong',
      );
      expect(window.navigator.clearBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.clearBadge()).rejects.toThrowError(
        'Something went wrong',
      );
    });
  });
  describe('Set and Clear Badge count by navigator.setExperimentalBadge', () => {
    beforeEach(() => {
      if (!('setExperimentalBadge' in window.navigator)) {
        Object.defineProperties(window.navigator, {
          setExperimentalBadge: {
            value: async (unreadCount) => {
              return await unreadCount;
            },
            writable: true,
            enumerable: true,
          },
          clearExperimentalBadge: {
            value: async () => {
              throw new Error('Something went wrong');
            },
            writable: true,
            enumerable: true,
          },
        });
      }
      jest.spyOn(window.navigator, 'setExperimentalBadge');
      jest.spyOn(window.navigator, 'clearExperimentalBadge');
    });

    it('[Sync] Should call navigator.setExperimentalBadge', async () => {
      expect(Badge.syncSetBadge(10)).toBeUndefined();
      expect(window.navigator.setExperimentalBadge).toHaveBeenCalledWith(10);
      expect(window.navigator.setExperimentalBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.setExperimentalBadge(10)).resolves.toEqual(
        10,
      );
    });

    it('[Async] Should call navigator.setExperimentalBadge', async () => {
      await expect(Badge.asyncSetBadge(10)).resolves.toBeDefined();
      expect(window.navigator.setExperimentalBadge).toHaveBeenCalledWith(10);
      expect(window.navigator.setExperimentalBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.setExperimentalBadge(10)).resolves.toEqual(
        10,
      );
    });

    it('[Sync] Should call navigator.clearExperimentalBadge', async () => {
      expect(Badge.syncClearBadge()).toBeUndefined();
      expect(window.navigator.clearExperimentalBadge).toHaveBeenCalledWith();
      expect(window.navigator.clearExperimentalBadge).toHaveBeenCalledTimes(1);
      await expect(
        window.navigator.clearExperimentalBadge(),
      ).rejects.toThrowError('Something went wrong');
    });

    it('[Async] Should call navigator.clearExperimentalBadge', async () => {
      await expect(Badge.asyncClearBadge()).rejects.toThrowError(
        'Something went wrong',
      );
      expect(window.navigator.clearExperimentalBadge).toHaveBeenCalledWith();
      expect(window.navigator.clearExperimentalBadge).toHaveBeenCalledTimes(1);
      await expect(
        window.navigator.clearExperimentalBadge(),
      ).rejects.toThrowError('Something went wrong');
    });
  });
  describe('Set and Clear Badge count by navigator.setClientBadge', () => {
    beforeEach(() => {
      if (!('setClientBadge' in window.navigator)) {
        Object.defineProperties(window.navigator, {
          setClientBadge: {
            value: async (unreadCount) => {
              return await unreadCount;
            },
            writable: true,
            enumerable: true,
          },
          clearClientBadge: {
            value: async () => {
              throw new Error('Something went wrong');
            },
            writable: true,
            enumerable: true,
          },
        });
      }
      jest.spyOn(window.navigator, 'setClientBadge');
      jest.spyOn(window.navigator, 'clearClientBadge');
    });

    it('[Sync] Should call navigator.setClientBadge', async () => {
      expect(Badge.syncSetBadge(10)).toBeUndefined();
      expect(window.navigator.setClientBadge).toHaveBeenCalledWith(10);
      expect(window.navigator.setClientBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.setClientBadge(10)).resolves.toEqual(10);
    });

    it('[Async] Should call navigator.setClientBadge', async () => {
      await expect(Badge.asyncSetBadge(10)).resolves.toBeDefined();
      expect(window.navigator.setClientBadge).toHaveBeenCalledWith(10);
      expect(window.navigator.setClientBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.setClientBadge(10)).resolves.toEqual(10);
    });

    it('[Sync] Should call navigator.clearClientBadge', async () => {
      expect(Badge.syncClearBadge()).toBeUndefined();
      expect(window.navigator.clearClientBadge).toHaveBeenCalledWith();
      expect(window.navigator.clearClientBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.clearClientBadge()).rejects.toThrowError(
        'Something went wrong',
      );
    });

    it('[Async] Should call navigator.clearClientBadge', async () => {
      await expect(Badge.asyncClearBadge()).rejects.toThrowError(
        'Something went wrong',
      );
      expect(window.navigator.clearClientBadge).toHaveBeenCalledWith();
      expect(window.navigator.clearClientBadge).toHaveBeenCalledTimes(1);
      await expect(window.navigator.clearClientBadge()).rejects.toThrowError(
        'Something went wrong',
      );
    });
  });

  describe('Set and Clear Badge count by window.ExperimentalBadge', () => {
    beforeEach(() => {
      if (!('ExperimentalBadge' in window)) {
        Object.defineProperty(window, 'ExperimentalBadge', {
          value: {},
          enumerable: true,
          configurable: true,
          writable: true,
        });
      }
      Object.defineProperty(window.ExperimentalBadge, 'set', {
        value: async (unreadCount) => {
          return await unreadCount;
        },
        enumerable: true,
        writable: true,
      });
      Object.defineProperty(window.ExperimentalBadge, 'clear', {
        value: async () => {
          throw new Error('Something went wrong');
        },
        enumerable: true,
        writable: true,
      });
    });
    it('[Sync] Should call window.ExperimentalBadge.set', () => {
      jest.spyOn(window.ExperimentalBadge, 'set');
      expect(Badge.syncSetBadge(10)).toBeUndefined();
      expect(window.ExperimentalBadge.set).toHaveBeenCalledWith(10);
      expect(window.ExperimentalBadge.set).toHaveBeenCalledTimes(1);
      expect(window.ExperimentalBadge.set(10)).resolves.toEqual(10);
    });

    it('[Async] Should call window.ExperimentalBadge.set', async () => {
      jest.spyOn(window.ExperimentalBadge, 'set');
      await expect(Badge.asyncSetBadge(10)).resolves.toBeDefined();
      expect(window.ExperimentalBadge.set).toHaveBeenCalledWith(10);
      expect(window.ExperimentalBadge.set).toHaveBeenCalledTimes(1);
      await expect(window.ExperimentalBadge.set(10)).resolves.toEqual(10);
    });

    it('[Sync] Should call window.ExperimentalBadge.clear', async () => {
      jest.spyOn(window.ExperimentalBadge, 'clear');
      expect(Badge.syncClearBadge()).toBeUndefined();
      expect(window.ExperimentalBadge.clear).toHaveBeenCalledWith();
      expect(window.ExperimentalBadge.clear).toHaveBeenCalledTimes(1);
      await expect(window.ExperimentalBadge.clear()).rejects.toThrowError(
        'Something went wrong',
      );
    });

    it('[Async] Should call window.ExperimentalBadge.clear', async () => {
      jest.spyOn(window.ExperimentalBadge, 'clear');
      await expect(Badge.asyncClearBadge()).rejects.toThrowError(
        'Something went wrong',
      );
      expect(window.ExperimentalBadge.clear).toHaveBeenCalledWith();
      expect(window.ExperimentalBadge.clear).toHaveBeenCalledTimes(1);
      await expect(window.ExperimentalBadge.clear()).rejects.toThrowError(
        'Something went wrong',
      );
    });
  });
});
