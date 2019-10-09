import { useStore } from '../store';
import { useActions } from '../store';

const useAuthenticated = () => {
  const checkAuthStore = useStore(store => store.auth.authenticated);
  const setAuthenticate = useActions(actions => actions.auth.authenticate);
  const expiry = useStore(store => store.expiry.expires);

  const now = Date.now();
  const expiryDate = expiry ? new Date(expiry) : new Date(now - 1);
  const nowDate = new Date(now);

  if (checkAuthStore) return true;
  else if (nowDate < expiryDate) {
    setAuthenticate();
    return true;
  }
  return false;
};

export default useAuthenticated;
