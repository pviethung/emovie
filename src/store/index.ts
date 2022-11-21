import { authReducer } from '@/features/auth';
import { filterReducer } from '@/features/filter';
import { themeReducer } from '@/features/theme';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['filter', 'theme'],
};

const filterConfig = {
  key: 'filter',
  storage: storage,
  blacklist: ['discoverFilter'],
};
const themeConfig = {
  key: 'theme',
  storage: storage,
  blacklist: ['showBackdrop'],
};

const rootReducer = combineReducers({
  filter: persistReducer(filterConfig, filterReducer),
  theme: persistReducer(themeConfig, themeReducer),
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => console.log('here', store.getState().theme.showBackdrop));
