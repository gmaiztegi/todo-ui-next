import ITodo from "../model/todo";
import TodoItem from "./TodoItem";

interface IProps {
  todos: ITodo[];
  onDelete: (todo: ITodo) => void;
}

const TodoItemList: React.FC<IProps> = ({ todos, onDelete }) => (
  <>
    {todos.map(todo => (
      <TodoItem
        key={todo._id}
        label={todo.label}
        onDelete={() => onDelete(todo)}
      />
    ))}
  </>
);

export default TodoItemList;
