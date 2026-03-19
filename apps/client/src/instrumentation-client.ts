import * as Sentry from '@sentry/nextjs';

const init = () => {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    sendDefaultPii: true,
    tracesSampleRate: 0.1,
  });
};

if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
  requestIdleCallback(init);
} else {
  setTimeout(init, 0);
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
