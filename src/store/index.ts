import auth, { AuthStore } from './auth';
import user, { UserStore } from './user';
import {
  createTypedHooks,
  createStore,
  Reducer,
  Action,
  action,
  Listen,
  listen,
  thunk,
  reducer as liftReducer,
} from 'easy-peasy';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Backend from '../backend';

interface ExpiryStore {
  expires: Date | null;
  setExpires: Action<AuthStore, number>;
  clearExpires: Action<AuthStore, undefined>;
  listeners: Listen<ExpiryStore>;
}

interface StoreModel {
  auth: AuthStore;
  user: UserStore;
  expiry: ExpiryStore;
}

export const models: StoreModel = {
  auth,
  user,
  expiry: {
    expires: null,
    setExpires: action((state, expire) => {
      state.expires = new Date(expire);
    }),
    clearExpires: action(state => {
      state.expires = null;
    }),
    listeners: listen(on => {
      on(
        auth.setExpires,
        thunk(async (actions, payload) => {
          actions.setExpires(payload);
        }),
      );
      on(
        auth.logout,
        thunk(async (actions, _payload) => {
          actions.clearExpires();
        }),
      );
    }),
  },
};

export interface Injections {
  Backend: typeof Backend;
}

const store = createStore(models, {
  reducerEnhancer: (reducer: Reducer) =>
    liftReducer(
      persistReducer(
        {
          key: 'EasyPeasyStore',
          storage,
          whitelist: ['expiry'],
        },
        reducer,
      ),
    ),
  injections: { Backend },
});

const storePersistor = persistStore(store);

const { useActions, useStore, useDispatch } = createTypedHooks<StoreModel>();

export { useActions, useDispatch, useStore, store, storePersistor };
