import style from "./TodoItem.scss";

interface IProps {
  label: string;
  onDelete: () => void;
}

const TodoItem: React.FC<IProps> = ({ label, onDelete }) => (
  <div className={style.item}>
    <p className={style.label}>{label}</p>
    <button className={style.delete} onClick={onDelete}>
      &times;
    </button>
  </div>
);

export default TodoItem;
