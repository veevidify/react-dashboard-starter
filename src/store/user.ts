import { action, Action, listen, Listen, thunk } from 'easy-peasy';
import auth from './auth';

export interface Repository<T> {
  byId: { [id: string]: T };
  ids: string[];
}

export interface UserStore {
  loading: boolean;
  loadings: boolean[];

  setLoading: Action<UserStore, boolean>;
  pushLoading: Action<UserStore>;
  popLoading: Action<UserStore>;
  listeners: Listen<UserStore>;
  reset: Action<UserStore, any>;
}

const userInitState = {
  loading: true,
  loadings: [],
};

const user: UserStore = {
  ...userInitState,
  pushLoading: action(state => {
    state.loadings.push(true);
  }),
  popLoading: action(state => {
    state.loadings.pop();
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  reset: action(state => ({
    ...state,
    ...userInitState,
  })),
  listeners: listen(on => {
    on(auth.authenticate, thunk(async () => {}));
    on(
      auth.logout,
      thunk(async (actions, _payload, { getStoreState }) => {
        actions.reset(getStoreState());
      }),
    );
  }),
};

export default user;
