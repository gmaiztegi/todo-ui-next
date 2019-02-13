import getConfig from "next/config";
import React from "react";
import styled from "styled-components";
import { DeepReadonly } from "utility-types";
import { AddTodoForm, TodoItemList } from "../components";
import TodoEndpoint from "../endpoint/todo";
import { InjectedProps, withTodoWebsocket } from "../hocs/withTodoWebsocket";
import ITodo from "../model/todo";

interface IProps extends InjectedProps {
  todos: ITodo[];
}

type IState = DeepReadonly<{
  todos: ITodo[];
}>;

const TodoBox = styled.div`
  width: 60rem;
  max-width: 100%;
  margin: 5rem auto;
  padding: 2rem;
  //border: 1px solid #222;
  border-radius: 0.3rem;
  background-color: #fff;
  box-shadow: 0 0.2rem 1.5rem rgba(#000, 0.2);

  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
`;

const PageTitle = styled.h1`
  text-transform: uppercase;
  font-size: 5rem;
  font-weight: 300;
  margin: 0 0 2rem;
`;

class IndexPage extends React.Component<IProps, IState> {
  readonly state = {
    todos: this.props.todos
  };

  constructor(props: IProps) {
    super(props);

    props.socket.on("connect", () => props.socket.emit("initialize"));
    props.socket.on("todos", (todos: ITodo[]) => this.setState({ todos }));
  }

  static getInitialProps = async () => {
    const { publicRuntimeConfig } = getConfig();
    const apiClient = new TodoEndpoint(publicRuntimeConfig.apiEndpoint);
    const todos = await apiClient.findAll();
    return { todos };
  };

  onCreate = (todo: string) => this.props.socket.emit("add", todo);

  onDelete = (todo: ITodo) => {
    /* this.setState(({ todos }) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      return { todos: newTodos };
    }); */
    this.props.socket.emit("delete", todo._id);
  };

  render() {
    return (
      <TodoBox>
        <PageTitle>To-do list</PageTitle>
        <AddTodoForm onCreate={this.onCreate} />
        <TodoItemList todos={this.state.todos} onDelete={this.onDelete} />
      </TodoBox>
    );
  }
}

// export default IndexPage;
export default withTodoWebsocket(IndexPage);
