import React from 'react';
import { createRoot } from 'react-dom/client';
import { SDK_INITIALIZED } from './utils/sdk-utils';
import { App } from './App';

await SDK_INITIALIZED;

const root = createRoot(document.createDocumentFragment());
root.render(<App />);
