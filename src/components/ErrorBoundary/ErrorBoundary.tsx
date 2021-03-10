import React, { ComponentType } from 'react';
import FallbackComponent, {
  Props as FallbackComponentProps,
} from './FallbackComponent';

type Props = {
  children: JSX.Element;
  FallbackComponent: ComponentType<FallbackComponentProps>;
  onError?: Function;
};

type State = { error: Error | null };

export default class ErrorBoundary extends React.PureComponent<Props, State> {
  state: State = { error: null };

  static defaultProps: {
    FallbackComponent: ComponentType<FallbackComponentProps>;
  } = {
    FallbackComponent: FallbackComponent,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Send error report to Sentry or similar.
    // For this test project console.log will do.
    console.log('ErrorBoundary', errorInfo);
  }

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    const { FallbackComponent: Component, children } = this.props;
    const { error } = this.state;

    return error ? (
      <Component error={error} resetError={this.resetError} />
    ) : (
      children
    );
  }
}
