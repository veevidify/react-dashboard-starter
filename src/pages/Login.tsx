import { Box, Button, Text, TextInput, Heading } from 'grommet';
import { Login as LoginIcon } from 'grommet-icons';
import React from 'react';
import { useFormState } from 'react-use-form-state';
import styled from 'styled-components';
import Loading from '../components/Loading';
import SnackBox from '../components/SnackBox';
import { useActions, useStore } from '../store';
import { LoginRequest } from '../store/auth';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Login: React.FC = () => {
  const [formState, { text, password }] = useFormState<LoginRequest>();

  const login = useActions(actions => actions.auth.login);
  const { errors, loading } = useStore(state => state.auth);

  if (loading) {
    return (
      <Box fill direction="column" justify="center">
        <Loading />
      </Box>
    );
  }

  return (
    <AppWrapper>
      <form
        onSubmit={e => {
          e.preventDefault();
          login(formState.values);
        }}
      >
        <Box align="center">
          <Heading color="brand">App</Heading>
        </Box>
        <Box direction="column" pad="small" background="light-2" round="small">
          <Box margin="small" background="white" round="small">
            <TextInput placeholder="username" {...text('username')} />
          </Box>
          <Box margin="small" background="white" round="small">
            <TextInput placeholder="password" {...password('password')} />
          </Box>
          {!!errors.length && (
            <Box margin="xsmall">
              <SnackBox>
                {errors.map(error => (
                  <Text>{error}</Text>
                ))}
              </SnackBox>
            </Box>
          )}
          <Button type="submit" icon={<LoginIcon />} label="Log In" />
        </Box>
      </form>
    </AppWrapper>
  );
};

export default Login;
