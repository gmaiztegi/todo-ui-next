import React from "react";
import { DeepReadonly } from "utility-types";
import { TodoItemList, AddTodoForm } from "../components";
import styles from "../styles/style.scss";

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

  onDelete = (index: number) => {
    this.setState(({ todos }) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      return { todos: newTodos };
    });
  };

  render() {
    return (
      <div className={styles.box}>
        <h1 className={styles.title}>To-do list</h1>
        <AddTodoForm onCreate={this.onCreate} />
        <TodoItemList todos={this.state.todos} onDelete={this.onDelete} />
      </div>
    );
  }
}

export default IndexPage;
