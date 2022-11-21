import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { SuspenseLoader } from './components/Elements';
import { Backdrop } from './components/Elements/Backdrop';
import { getUpdatedUser } from './features/auth';
import { ThemeProvider } from './features/theme';
import { AppRoutes } from './routes';
import { persistor, store } from './store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate
            onBeforeLift={() => {
              store.dispatch(getUpdatedUser());
            }}
            loading={<SuspenseLoader />}
            persistor={persistor}
          >
            <ThemeProvider>
              <Backdrop />
              <Toaster
                toastOptions={{
                  position: 'bottom-left',
                  style: {
                    padding: 0,
                    margin: 0,
                    background: 'transparent',
                    boxShadow: 'none',
                    maxWidth: 400,
                  },
                }}
              />

              <AppRoutes />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
