import { useState } from "react";
import TextInput from "../TextInput.jsx";
export default function NewListForm({ onAdd }) {
  let [name, setName] = useState("");

  function onhandleSubmit(event) {
    event.preventDefault();
    onAdd(name);
    setName("");
  }

  return (
    <form onSubmit={onhandleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Add New List"
      />
      <br />
      <button id="AddButton" type="submit" disabled={name.trim().length === 0}>
        Add New List
      </button>
    </form>
  );
}
