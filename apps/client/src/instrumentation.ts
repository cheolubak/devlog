import { logs } from '@opentelemetry/api-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from '@opentelemetry/sdk-logs';
import {
  BatchSpanProcessor,
  NodeTracerProvider,
} from '@opentelemetry/sdk-trace-node';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'edge') return;

  const endpoint = process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT;
  const authorization =
    process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_HEADERS_Authorization;

  if (!endpoint || !authorization) return;

  const headers = { Authorization: decodeURIComponent(authorization) };

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'devlog',
    [ATTR_SERVICE_VERSION]: process.env.npm_package_version ?? '0.0.0',
  });

  // Traces
  const traceExporter = new OTLPTraceExporter({
    headers,
    url: `${endpoint}/v1/traces`,
  });
  const tracerProvider = new NodeTracerProvider({
    resource,
    spanProcessors: [new BatchSpanProcessor(traceExporter)],
  });
  tracerProvider.register();

  registerInstrumentations({
    instrumentations: [new HttpInstrumentation()],
    tracerProvider,
  });

  // Logs
  const logExporter = new OTLPLogExporter({
    headers,
    url: `${endpoint}/v1/logs`,
  });
  const loggerProvider = new LoggerProvider({
    processors: [new BatchLogRecordProcessor(logExporter)],
    resource,
  });
  logs.setGlobalLoggerProvider(loggerProvider);

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
