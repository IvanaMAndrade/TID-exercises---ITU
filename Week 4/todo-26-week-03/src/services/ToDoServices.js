import Parse from "parse";
const TodoItem = Parse.Object.extend("TodoItem");
//service is of is connecting the backend to the DB

/*Function that converts Parse object → normal JavaScript object*/
function toPlainObject(parseObject) {
  return {
    id: parseObject.id,
    text: parseObject.get("text"),
    document: parseObject.get("done"),
  };
}

/* function that fectch the ToDo list from the DB*/
export async function fetchTodos() {
  const query = new Parse.Query(TodoItem);
  query.ascending("createdAt"); //oldest first
  const results = await query.find();
  return results.map(toPlainObject);
}

/*function for creating the toDo Item*/
export async function createTodo(text) {
  const item = new TodoItem();
  item.set("text", text);
  item.set("done", false);
  return toPlainObject(await item.save());
}

/*function to set the todoItem */
export async function setTodoDone(id, done) {
  //we have the id, so we don't need the object before changing it
  const item = TodoItem.createWithoutData(id);
  item.ser("done", done);
  return toPlainObject(await item.save());
}

export async function deleteTodo(id) {
  const item = TodoItem.createWithoutData(id);
  await item.destroy();
}
