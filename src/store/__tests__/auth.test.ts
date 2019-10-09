import mockBackend, { mockIsoDate } from '../__mocks__/api';
import { createStore } from 'easy-peasy';
import { models } from '../index';

describe('Test successful auth and persist expiry', () => {
  const store = createStore(models, { injections: { Backend: mockBackend } });

  it('should reduce login, set cookie and expiry correctly after login', async () => {
    await store.getActions().auth.login({ username: 'test', password: 'test' });
    const afterState = store.getState();

    expect(afterState).toMatchObject({
      auth: {
        authenticated: true,
        expires: new Date(mockIsoDate),
      },
      expiry: {
        expires: new Date(mockIsoDate),
      },
    });
  });

  it('should clear out everything after logout', async () => {
    store.getActions().auth.logout();
    const afterState = store.getState();
    expect(afterState).toMatchObject({
      auth: {
        authenticated: false,
        loading: false,
        errors: [],
        expires: null,
      },
      expiry: {
        expires: null,
      },
    });
  });
});
