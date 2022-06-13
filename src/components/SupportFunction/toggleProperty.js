export function toggleProperty(arr, id, propName, propName2, text) {
  const idx = arr.findIndex((el) => el.id === id);
  const oldItem = arr[idx];
  const newItem = { ...oldItem, [propName]: !oldItem[propName], [propName2]: text };

  return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
}
