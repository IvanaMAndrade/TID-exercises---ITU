import { useState, useEffect } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import ToDoItem from "./ToDoItem.jsx";
import "./App.css"; //remember to import style sheet
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
} from "./services/ToDoServices.js";

export default function ToDoList({ firstName }) {
  let h1Style = { fontFamily: "DM Serif Display" };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      setTodos(await fetchTodos());
    }
    load();
  }, []);

  async function handleAdd(newTask) {
    const created = await createTodo(newTask);
    setTodos([...todos, created]);
  }

  async function handleDelete(idToDelete) {
    await deleteTodo(idToDelete);
    setTodos(todos.filter((each) => each.id !== idToDelete));
  }

  async function handleToggle(id) {
    const todo = todos.find((t) => t.id == id);
    await setTodoDone(id, !todo.done);
    setTodos(todos.map((t) => (t.id == id ? { ...t, done: !t.done } : t)));
  }

  return (
    <div className="card">
      <h1 style={h1Style}>To Do List for {firstName}</h1>
      <NewTodoForm onAdd={handleAdd} />

      {todos.length === 0 ? (
        <>Nothing to do</>
      ) : (
        <ul>
          {todos.map((elem) => (
            <ToDoItem
              key={elem.id}
              elem={elem}
              onDelete={handleDelete}
              onChange={handleToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
