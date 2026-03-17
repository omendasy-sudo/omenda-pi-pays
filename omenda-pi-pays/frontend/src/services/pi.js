const PI_SDK_VERSION = '2.0';

export function isPiBrowser() {
  if (typeof window === 'undefined') {
    return false;
  }

  return /PiBrowser|Pi Browser/i.test(window.navigator.userAgent) || !!window.Pi;
}

export function getPiSandboxMode() {
  return import.meta.env.VITE_PI_SANDBOX === 'true';
}

export async function waitForPiSdk(timeoutMs = 8000) {
  if (typeof window === 'undefined') {
    throw new Error('Pi SDK only runs in a browser');
  }

  if (window.Pi) {
    return window.Pi;
  }

  await new Promise((resolve, reject) => {
    const start = Date.now();

    const timer = window.setInterval(() => {
      if (window.Pi) {
        window.clearInterval(timer);
        resolve();
        return;
      }

      if (Date.now() - start >= timeoutMs) {
        window.clearInterval(timer);
        reject(new Error('Pi SDK did not load. Open this app in Pi Browser and retry.'));
      }
    }, 150);
  });

  return window.Pi;
}

export async function initPiSdk() {
  const pi = await waitForPiSdk();

  try {
    pi.init({ version: PI_SDK_VERSION, sandbox: getPiSandboxMode() });
  } catch (_error) {
    // Pi Browser throws if init is called more than once in the same session.
  }

  return pi;
}