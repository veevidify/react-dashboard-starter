import { Anchor, Box, Button, Grid, Heading, Layer, Text } from 'grommet';
import { Menu } from 'grommet-icons';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { useActions, useStore } from '../store';
import useMobile from '../utils/useMobile';
import Loading from '../components/Loading';

const Home = React.lazy(() => import('../pages/Home'));

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <Text>Home</Text>,
    page: () => <Home />,
  },
  {
    path: '/logout',
    exact: true,
    page: () => <Logout />,
  },
];

const Logout = () => {
  const logout = useActions(actions => actions.auth.logout);
  console.log('logout component');
  useEffect(() => {
    logout();
  });

  return <Redirect to="/" />;
};

const Sidebar = () => {
  const logout = useActions(actions => actions.auth.logout);

  return (
    <Box
      gridArea="nav"
      direction="column"
      align="center"
      background="light-3"
      pad={{ vertical: 'large', horizontal: 'small' }}
    >
      {routes
        .filter(route => route.sidebar)
        .map(
          route =>
            route.sidebar && (
              //@ts-ignore
              <Anchor as={Link} to={route.path}>
                {route.sidebar()}
              </Anchor>
            ),
        )}
      <Anchor margin={{ top: 'medium' }} onClick={() => logout()}>
        Log out
      </Anchor>
    </Box>
  );
};

const AuthenticatedApp: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);

  const mobile = useMobile();

  const mobileGrid = [
    { name: 'header', start: [0, 0], end: [1, 0] },
    { name: 'main', start: [0, 1], end: [1, 1] },
  ];

  const desktopGrid = [
    { name: 'header', start: [0, 0], end: [1, 0] },
    { name: 'nav', start: [0, 1], end: [0, 1] },
    { name: 'main', start: [1, 1], end: [1, 1] },
  ];

  const loading = useStore(state => state.user.loading);

  if (loading) {
    return (
      <Box fill direction="column" justify="center">
        <Loading />
      </Box>
    );
  }

  return (
    <Router>
      <Box pad="small" fill direction="row">
        {mobile && sidebar && (
          <Layer
            onEsc={() => setSidebar(false)}
            onClickOutside={() => setSidebar(false)}
            responsive={false}
            position="left"
            full="vertical"
          >
            <Box height="100%" background="light-3" justify="center" pad="small">
              <Sidebar />
            </Box>
          </Layer>
        )}
        <Grid
          fill
          rows={['xsmall', 'flex']}
          columns={['small', 'auto']}
          gap="small"
          areas={mobile ? mobileGrid : desktopGrid}
        >
          <Box
            gridArea="header"
            background="brand"
            align="center"
            direction="row"
            pad={{ left: 'medium' }}
          >
            {mobile && (
              <Button onClick={() => setSidebar(!sidebar)}>
                <Box
                  margin="small"
                  round="small"
                  pad="small"
                  border={{ color: 'white', side: 'all' }}
                >
                  <Menu />
                </Box>
              </Button>
            )}
            <Heading>App</Heading>
          </Box>
          {!mobile && (
            <Box>
              <Sidebar />
            </Box>
          )}
          <Box gridArea="main">
            <React.Suspense
              fallback={
                <Box margin={{ horizontal: 'auto' }}>
                  <Loading noMargin={true} />
                </Box>
              }
            >
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={!!route.exact}
                  component={route.page}
                />
              ))}
            </React.Suspense>
          </Box>
        </Grid>
      </Box>
    </Router>
  );
};

export default AuthenticatedApp;
