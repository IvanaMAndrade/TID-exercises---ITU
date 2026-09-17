import "./App.css";
import ToDoList from "./ToDoList.jsx";
import Parse from "parse"; /*import the Parse backend*/

/*Initializing parse*/
(Parse.initialize(
  "l5X5hLwTdqhLYM6QL4EDQX58NA0KNEVsR2VSGOcX", //appID
  "br9aKuLVcJuL0JxECXWuSPX8YiDodeysRmrzqwqO",
), //JSKey),
  (Parse.serverURL = "https://parseapi.back4app.com")); //apiURL

function App() {
  return (
    <div className="main-inner">
      <ToDoList firstName="Anna" />
    </div>
  );
}

export default App;
