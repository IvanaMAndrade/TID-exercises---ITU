import { Link } from "react-router-dom";

export default function Home({ lists, onAddList }) {
  return (
    <div>
      <h1>My To-Do Lists</h1>

      {/* List of all existing todo lists */}
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <Link to={`/lists/${list.id}`}>{list.name}</Link>
          </li>
        ))}
      </ul>

      {/* Your form or button to add a new list */}
    </div>
  );
}
