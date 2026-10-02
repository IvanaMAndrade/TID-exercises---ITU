import { useState } from "react";
import TextInput from "../TextInput.jsx";
export default function NewTodoForm({ onAdd, list }) {
  let [task, setTask] = useState("");

  function onButtonClick(event) {
    event.preventDefault();
    if (!task.trim()) return;
    onAdd(task, list);
    setTask("");
  }

  return (
    <form onSubmit={onButtonClick}>
      <TextInput input={task} setInput={setTask} />
      <button id="AddButton" type="submit" disabled={task.trimlength === 0}>
        Add New Task
      </button>
    </form>
  );
}
