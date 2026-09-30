import "./App.css";
import ToDoList from "./componentes/ToDoList";
import AuthPage from "./pages/AuthPage";
import Parse from "parse"; /*import the Parse backend*/
import { useState } from "react";

/*Initializing parse*/
(Parse.initialize(
  "l5X5hLwTdqhLYM6QL4EDQX58NA0KNEVsR2VSGOcX", //appID
  "br9aKuLVcJuL0JxECXWuSPX8YiDodeysRmrzqwqO",
), //JSKey),
  (Parse.serverURL = "https://parseapi.back4app.com")); //apiURL

function App() {
  const [user, setUser] = useState(Parse.User.current());

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }

  function handleLogout() {
    Parse.User.logOut().then(() => setUser(null));
  }

  // conditional early return
  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div>
      <TodoList userId={user.id} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
