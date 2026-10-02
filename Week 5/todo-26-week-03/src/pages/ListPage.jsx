import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Parse from "parse";
import ToDoItem from "../componentes/ToDoItem";
import { fetchTodosByList } from "../services/ToDoServices";
import { Link } from "react-router-dom";
import NewTodoForm from "../componentes/NewTodoForm";
import { useState } from "react";
import { createTodo } from "../services/ToDoServices";

const List = Parse.Object.extend("List");

export default function ListPage() {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      const listQuery = new Parse.Query(List);
      const list = await listQuery.get(listId);
      const todos = await fetchTodosByList(list);
      setList(list);
      setTodos(todos);
    }

    load();
  }, [listId]);

  if (!list) {
    return <p>Loading...</p>;
  }

  async function handleAdd(newTask, list) {
    const created = await createTodo(newTask, list);
    setTodos([...todos, created]);
  }

  return (
    <div>
      <h1>{list.get("name")}</h1>
      <NewTodoForm list={list} onAdd={handleAdd} />
      <ul>
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            elem={todo}
            onDelete={handleDelete}
            onChange={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
}
