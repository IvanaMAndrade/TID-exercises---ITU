import "./App.css";
import ToDoList from "./componentes/ToDoList";
import AuthPage from "./pages/AuthPage";
import Parse from "parse"; /*import the Parse backend*/
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import ListPage from "./pages/ListPage";

/*Initializing parse*/
(Parse.initialize(
  "l5X5hLwTdqhLYM6QL4EDQX58NA0KNEVsR2VSGOcX", //appID
  "br9aKuLVcJuL0JxECXWuSPX8YiDodeysRmrzqwqO",
), //JSKey),
  (Parse.serverURL = "https://parseapi.back4app.com")); //apiURL

// Protected Route Wrapper Component created by Gemini
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(Parse.User.current());
  const navigate = useNavigate();

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
    navigate("/");
  }

  async function handleLogout() {
    await Parse.User.logOut().then(() => setUser(null));
    navigate("/login");
  }

  return (
    <div className="main-inner">
      {user && <button onClick={handleLogout}>Logout</button>}
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <AuthPage onAuthenticated={handleAuthenticated} />
            )
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <ToDoList userId={user?.id} firstName={user?.getUsername()} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lists/:listId"
          element={
            <ProtectedRoute user={user}>
              <ListPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
