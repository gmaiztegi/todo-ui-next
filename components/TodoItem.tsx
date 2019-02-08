import styled from "styled-components";

const ItemElement = styled.div`
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;

  :not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const TodoLabel = styled.p`
  margin-right: 1rem;
`;

const DeleteButton = styled.button`
  border: 0 none;
  cursor: pointer;
`;

interface IProps {
  label: string;
  onDelete: () => void;
}

const TodoItem: React.FC<IProps> = ({ label, onDelete }) => (
  <ItemElement>
    <TodoLabel>{label}</TodoLabel>
    <DeleteButton onClick={onDelete}>&times;</DeleteButton>
  </ItemElement>
);

export default TodoItem;
