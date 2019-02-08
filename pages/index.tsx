import React from "react";
import styled from "styled-components";
import { DeepReadonly } from "utility-types";
import { AddTodoForm, TodoItemList } from "../components";

type IState = DeepReadonly<{
  todos: string[];
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

class IndexPage extends React.Component<{}, IState> {
  state = {
    todos: ["HEY", "EI"]
  };

  onCreate = (todo: string) =>
    this.setState(({ todos }) => ({
      todos: [...todos, todo]
    }));

  onDelete = (index: number) => {
    this.setState(({ todos }) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      return { todos: newTodos };
    });
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

export default IndexPage;
