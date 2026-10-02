import { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem.jsx";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
  fetchTodosByList,
} from "../services/ToDoServices.js";
import NewListForm from "./NewListForm.jsx";
import { createList } from "../services/ListService.js";
import { fetchLists } from "../services/ListService.js";
import { Link } from "react-router-dom";

export default function ToDoList({ firstName, userID }) {
  let h1Style = { fontFamily: "DM Serif Display" };

  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function load() {
      const allLists = await fetchLists();
      setLists(allLists);

      const todos = [];
      for (const list of allLists) {
        const fetchedTodos = await fetchTodosByList(list);
        todos.push(...fetchedTodos);
      }
      setTodos(todos);
    }
    load();
  }, []);

  async function handleAddList(newList) {
    const created = await createList(newList);
    setLists([...lists, created]);
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
      <NewListForm onAdd={handleAddList} />
      {lists.length === 0 ? (
        <>No lists found</>
      ) : (
        <ul>
          {lists.map((list) => (
            <li key={list.id}>
              <h2>
                {" "}
                <Link to={`/lists/${list.id}`}> {list.name}</Link>
              </h2>
              <ul>
                {todos
                  .filter((todo) => todo.list === list.id)
                  .map((todo) => (
                    <ToDoItem
                      key={todo.id}
                      elem={todo}
                      onDelete={handleDelete}
                      onChange={handleToggle}
                    />
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
