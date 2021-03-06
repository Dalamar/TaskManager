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

export default class ErrorBoundary extends React.Component<Props, State> {
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
    console.log('ErrorBoundary', errorInfo);
  }

  resetError: Function = () => {
    this.setState({ error: null });
  };

  render() {
    const { FallbackComponent, children } = this.props;
    const { error } = this.state;

    return error ? (
      // @ts-ignore
      <FallbackComponent error={error} resetError={this.resetError} />
    ) : (
      children
    );
  }
}
