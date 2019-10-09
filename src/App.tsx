import { Box } from 'grommet';
import React from 'react';
import Loading from './components/Loading';
import useAuthenticated from './utils/useAuthenticated';

const loadAuthenticatedApp = () => import('./app/authenticated');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnAuthenticatedApp = React.lazy(() => import('./app/unauthenticated'));

const App: React.FC = () => {
  const authenticated = useAuthenticated();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <React.Suspense
      fallback={
        <Box fill direction="column" justify="center">
          <Loading />
        </Box>
      }
    >
      {authenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
