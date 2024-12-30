import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { SDK_INITIALIZED } from './utils/sdk-utils';

async function bootstrap() {
  await SDK_INITIALIZED;

  const root = createRoot(document.createDocumentFragment());
  root.render(<App />);
}

bootstrap();
