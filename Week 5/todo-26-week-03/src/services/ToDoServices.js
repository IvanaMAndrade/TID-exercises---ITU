import Parse from "parse";
const TodoItem = Parse.Object.extend("TodoItem");
const List = Parse.Object.extend("List");
//service is of is connecting the backend to the DB

/*Function that converts Parse object → normal JavaScript object*/
function toPlainObject(parseObject) {
  const user = parseObject.get("user");
  const list = parseObject.get("list");
  return {
    id: parseObject.id,
    text: parseObject.get("text"),
    done: parseObject.get("done"),
    user: user ? user.id : null,
    list: list ? list.id : null,
  };
}

// AI CREATION: Converts a string ID or plain JS object into a valid Parse Pointer <List>
function getListPointer(list) {
  if (!list) return null;
  if (typeof list === "string") {
    return List.createWithoutData(list);
  }
  if (list instanceof Parse.Object) {
    return list;
  }
  if (list.id) {
    return List.createWithoutData(list.id);
  }
  return list;
}

/* function that fectch the ToDo list from the DB*/
export async function fetchTodos() {
  const query = new Parse.Query(TodoItem);
  query.ascending("createdAt"); //oldest first
  const results = await query.find();
  return results.map(toPlainObject);
}

/*function for creating the toDo Item*/
export async function createTodo(text, list) {
  const item = new TodoItem();
  const user = Parse.User.current();
  item.set("text", text);
  item.set("done", false);
  item.set("user", user);
  item.set("list", getListPointer(list));
  item.setACL(new Parse.ACL(user)); //only the list owner sees the items
  return toPlainObject(await item.save());
}

/*function to set the todoItem */
export async function setTodoDone(id, done) {
  //we have the id, so we don't need the object before changing it
  const item = TodoItem.createWithoutData(id);
  item.set("done", done);
  return toPlainObject(await item.save());
}

//each List displays the TodoItems that belong to it
export async function fetchTodosByList(list) {
  const query = new Parse.Query(TodoItem);
  query.equalTo("list", getListPointer(list));
  const todos = await query.find();
  return todos.map(toPlainObject);
}

export async function deleteTodo(id) {
  const item = TodoItem.createWithoutData(id);
  await item.destroy();
}
