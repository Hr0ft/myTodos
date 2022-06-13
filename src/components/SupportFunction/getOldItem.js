export function getOldItem(arr, id) {
  const idx = arr.findIndex((el) => el.id === id);
  return arr[idx];
}
