import React, { useState } from "react";

export interface IProps {
  onCreate: (todo: string) => void;
}

const AddTodoForm: React.FC<IProps> = ({ onCreate }) => {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (text.length > 0) {
          onCreate(text);
          setText("");
        }
        return false;
      }}
    >
      <input value={text} onChange={event => setText(event.target.value)} />
    </form>
  );
};

export default AddTodoForm;
