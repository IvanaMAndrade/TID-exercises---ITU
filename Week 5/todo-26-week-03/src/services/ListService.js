import parse from "parse";

const List = parse.Object.extend("List");

function toPlainObject(parseObject) {
  const owner = parseObject.get("owner");
  return {
    id: parseObject.id,
    name: parseObject.get("name"),
    owner: owner ? owner.id : null,
  };
}

export async function createList(name) {
  const list = new List();
  const user = parse.User.current();
  list.set("name", name);
  list.set("owner", user);
  list.setACL(new parse.ACL(user)); //only the list owner sees the items
  return toPlainObject(await list.save());
}

//*Function that converts Parse object → normal JavaScript object*/
export async function fetchLists() {
  const query = new Parse.Query(List);
  query.equalTo("owner", Parse.User.current());
  const results = await query.find();
  return results.map(toPlainObject);
}

export async function deleteList(id) {
  const list = ListItem.createWithoutData(id);
  await list.destroy();
}
