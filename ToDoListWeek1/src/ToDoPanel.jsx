export default function ToDoPanel({ WeekDay, Month, children }) {
  return (
    <>
      <h1> To Do List for {WeekDay}</h1> {/* header */}
      <div style={{ backgroundColor: "palegreen" }}>{children}</div>
    </>
  );
}
