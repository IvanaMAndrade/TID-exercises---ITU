export default function ToDoList(props) {
  let WeekDay = props.WeekDay;
  let Month = props.Month;
  let ToDos = props.ToDos;

  {
    /* '{WeekDay}' above is a prop, which is a parameter inside of react */
  }
  {
    /* first {} is JS and second {} is a in-line deffinition of a dictionary and a dictionary (which in JS is called a map) is a key followed by a data e.g: background: "deeppink", 'backgorund' is the key and "deepink" is the data
     */
  }

  let h1Style = { color: "deeppink", background: "white" };

  return (
    <>
      <h1 style={h1Style}> To Do List for {WeekDay}</h1> {/* header */}
      <ul>
        {ToDos.map((elem) => (
          <li>{elem}</li>
        ))}
      </ul>
    </>
  );
}
