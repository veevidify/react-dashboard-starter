import { action, Action, thunk, Thunk } from 'easy-peasy';
import { Injections } from '.';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthStore {
  authenticated: boolean;
  loading: boolean;
  loadings: boolean[];
  errors: string[];
  expires: Date | null;

  pushLoading: Action<AuthStore>;
  popLoading: Action<AuthStore>;
  authenticate: Action<AuthStore, undefined>;
  unauthenticate: Action<AuthStore, undefined>;
  setError: Action<AuthStore, string[]>;
  setLoading: Action<AuthStore, boolean>;
  setExpires: Action<AuthStore, number>;
  login: Thunk<AuthStore, LoginRequest, Injections>;
  logout: Action<AuthStore>;
}

const initState = {
  authenticated: false,
  loading: false,
  loadings: [],
  errors: [],
  expires: null,
};

const auth: AuthStore = {
  ...initState,
  pushLoading: action(state => {
    state.loadings.push(true);
  }),
  popLoading: action(state => {
    state.loadings.pop();
  }),
  authenticate: action(state => {
    state.authenticated = true;
  }),
  unauthenticate: action(state => {
    state.authenticated = false;
  }),
  setLoading: action((state, loading) => {
    state.loading = loading;
  }),
  setError: action((state, errors) => {
    state.errors = errors;
    state.loading = false;
  }),
  setExpires: action((state, expire) => {
    state.expires = new Date(expire);
  }),
  logout: action(state => {
    state.authenticated = false;
    state.loading = false;
    state.expires = null;
    state.errors = [];
  }),
  login: thunk(async (actions, loginPayload, { injections }) => {
    const { Backend } = injections;
    actions.pushLoading();
    try {
      const { data } = await Backend.login(loginPayload);
      const { expire } = data;
      actions.setExpires(expire);
      actions.authenticate();
      actions.popLoading();
    } catch (e) {
      actions.setError([e.message]);
      actions.popLoading();
    }
  }),
};

export default auth;
