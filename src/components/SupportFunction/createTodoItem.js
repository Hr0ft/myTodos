export function createTodoItem(text, fullTime, id) {
  return {
    description: text,
    createItem: new Date(),
    id: id(),
    done: false,
    show: true,
    editing: false,
    fullTime,
    play: false,
  };
}
