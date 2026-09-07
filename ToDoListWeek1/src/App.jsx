import "./App.css";
import ToDoList from "./ToDoList.jsx";
import ToDoPanel from "./ToDoPanel.jsx";
("./ToDoList.jsx");

function App() {
  const MondayToDoList = ["Cook", "Clean", "Bake"];
  const TuesdayToDoList = ["Trash", "Groceries", "Plants"];

  return (
    <>
      <ToDoList WeekDay={"Monday"} ToDos={MondayToDoList} />{" "}
      {/* 'Monday' here is a prop, which is a parameter inside of react */}
      <ToDoList WeekDay={"Tuesday"} ToDos={TuesdayToDoList} />
      <ToDoPanel WeekDay={"Monday"}>
        <ol></ol>
      </ToDoPanel>
    </>
  );
}

export default App;
