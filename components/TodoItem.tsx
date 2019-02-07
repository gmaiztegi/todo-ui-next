interface IProps {
  label: string;
  onDelete: () => void;
}

const TodoItem: React.FC<IProps> = ({ label, onDelete }) => (
  <div>
    <p>{label}</p>
    <button onClick={onDelete}>Delete</button>
  </div>
);

export default TodoItem;
