import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'mobx-react';
import App from './App';
import { pokemonStore } from './store/store';

const queryClient = new QueryClient();

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider pokemon={pokemonStore}>
          <App />
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
