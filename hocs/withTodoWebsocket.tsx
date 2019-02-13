import { NextComponentType, NextContext } from "next";
import getConfig from "next/config";
import React from "react";
import io from "socket.io-client";

export interface InjectedProps {
  socket: SocketIOClient.Socket;
}

// tslint:disable-next-line:no-empty-interface
interface HocProps {}

export const withTodoWebsocket = <PassThroughProps extends {}>(
  WrappedComponent: NextComponentType<
    PassThroughProps & InjectedProps,
    PassThroughProps
  >
) => {
  type UnionProps = HocProps & PassThroughProps;

  return class WithTodoWebsocket extends React.Component<UnionProps> {
    static displayName = `withState(${WrappedComponent.name})`;
    static readonly WrappedComponent = WrappedComponent;

    static async getInitialProps(ctx: NextContext): Promise<UnionProps> {
      if (WrappedComponent.getInitialProps) {
        const childProps = await WrappedComponent.getInitialProps(ctx);

        return { ...childProps };
      } else {
        return {} as UnionProps;
      }
    }

    private readonly socket: SocketIOClient.Socket;

    constructor(props: UnionProps) {
      super(props);

      this.socket = io(getConfig().publicRuntimeConfig.apiEndpoint, {
        autoConnect: false
      });
    }

    componentDidMount() {
      this.socket.open();
    }

    componentWillUnmount() {
      this.socket.close();
    }

    render() {
      const { ...restProps } = this.props as PassThroughProps;
      return <WrappedComponent {...restProps} socket={this.socket} />;
    }
  };
};
