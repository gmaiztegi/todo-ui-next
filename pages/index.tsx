import React from "react";
import { DeepReadonly } from "utility-types";
import { TodoItemList, AddTodoForm } from "../components";
import "../styles/style.scss";

type IState = DeepReadonly<{
  todos: string[];
}>;

class IndexPage extends React.Component<{}, IState> {
  state = {
    todos: ["HEY", "EI"]
  };

  onCreate = (todo: string) =>
    this.setState(({ todos }) => ({
      todos: [...todos, todo]
    }));
  onDelete = (index: number, event: React.MouseEvent) => {
    this.setState(({ todos }) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      return { todos: newTodos };
    });
  };

  render() {
    return (
      <>
        <h1>A title!</h1>
        <AddTodoForm onCreate={this.onCreate} />
        <TodoItemList todos={this.state.todos} onDelete={this.onDelete} />
      </>
    );
  }
}

export default IndexPage;
