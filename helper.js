// onPlay(id) {

//   if (!oldItem.play) {
//     this.inteerval = setInterval(() => {
//       this.updateTime(id);
//     }, 1000);
//   }
// }
console.log(1);
// updateTime(id) {
//   this.setState(({ todoList }) => {
//     const idx = todoList.findIndex((el) => el.id === id);
//     const oldItem = todoList[idx];
//     let fullTime = oldItem;
//     if (fullTime.fullTime > 0) {
//       const newItem = { ...oldItem, play: true, fullTime: fullTime.fullTime - 1 };
//       return { todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)] };
//     } else {
//       clearInterval(this.inteerval);
//     }
//   });
// }
console.log(2);
// onPause(id) {
//   clearInterval(this.inteerval);
//   this.setState(({ todoList }) => {
//     const idx = todoList.findIndex((el) => el.id === id);
//     const oldItem = todoList[idx];
//     const newItem = { ...oldItem, play: false };
//     return { todoList: [...todoList.slice(0, idx), newItem, ...todoList.slice(idx + 1)] };
//   });
// }
