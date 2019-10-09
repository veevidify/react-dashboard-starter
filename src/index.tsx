import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider } from 'styled-components';
import { Grommet } from 'grommet';
import { PersistGate } from 'redux-persist/integration/react';

import { store, storePersistor } from './store';
import theme from './utils/theme';
import App from './App';
import Loading from './components/Loading';

document.getElementsByClassName('spinner-wrapper')[0].remove();
const root = document.createElement('div');
root.id = 'root';

document.body.append(root);

ReactDOM.render(
  <PersistGate persistor={storePersistor} loading={<Loading />}>
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Grommet theme={theme}>
          <App />
        </Grommet>
      </ThemeProvider>
    </StoreProvider>
  </PersistGate>,
  document.getElementById('root'),
);
