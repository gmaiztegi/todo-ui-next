import TodoItem from "./TodoItem";

interface IProps {
  todos: string[];
  onDelete: (index: number) => void;
}

const TodoItemList: React.FC<IProps> = ({ todos, onDelete }) => (
  <>
    {todos.map((todo, index) => (
      <TodoItem key={index} label={todo} onDelete={() => onDelete(index)} />
    ))}
  </>
);

export default TodoItemList;
