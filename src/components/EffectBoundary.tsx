import React from 'react';
import { Text } from 'grommet';

interface State {
  error: boolean;
}

interface Prop extends GObject {}

class EFfectBoundary extends React.Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(_err: unknown) {
    return { error: true };
  }

  // sentry, etc.
  componentDidCatch(_err: unknown, _info: unknown) {}

  render() {
    return this.state.error ? (
      <Text>Unknown error while processing data</Text>
    ) : (
      this.props.children
    );
  }
}

export default EFfectBoundary;
