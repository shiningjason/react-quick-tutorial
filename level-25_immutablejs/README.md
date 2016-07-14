# Level 25. 整合 ImmutableJS

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 25 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：整合 ImmutableJS
2. 獲得新技能：
  1. [ImmutableJS] 了解 ImmutableJS 的使用方法


## :triangular_flag_on_post: 主線任務

### 1. 引入 Immutable.js

從 cdnjs 中，複製 [immutable](https://cdnjs.com/libraries/immutable) 最新版本的連結，並貼到 index.html 中。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.0/immutable.js"></script>
```

### 2. 修改 ./reducers/todos.js

```js
// 1. 引入 List 和 Record
const { List, Record } = Immutable;

// 2. 將 Todo Model 定義為 Immutable 的 Record
const TodoRecord = Record({
  id: undefined,
  title: undefined,
  completed: false
});

// 3. 將尋找 Todo 清單某筆 Todo 的 index 的邏輯拉出來
const _findIdxById = (todos, id) => todos.findIndex((todo) => todo.id === id);

// 4. 使用 List 的 push() 重構
const _createTodo = (todos, title) =>
  todos.push(new TodoRecord({
    id: todos.last().id + 1,
    title,
    completed: false
  }));

// 5. 使用 List 的 setIn() 重構
const _updateTodo = (todos, id, title) =>
  todos.setIn([ _findIdxById(todos, id), 'title' ], title);

// 6. 使用 List 的 setIn() 重構
const _toggleTodo = (todos, id, completed) =>
  todos.setIn([ _findIdxById(todos, id), 'completed' ], completed);

// 7. 使用 List 的 delete() 重構
const _deleteTodo = (todos, id) =>
  todos.delete(_findIdxById(todos, id));

// 8. 預設的 state 修改成 new List()
window.App.reducers.todos = (state = new List(), action) => {
  // ...
};
```


## :book: 閱讀筆記

### 1. [ImmutableJS] 了解 ImmutableJS 的使用方法

參考文件：

- [ImmutableJS](https://facebook.github.io/immutable-js)


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-24_react-redux) ｜ 完 :mortar_board: ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-25_immutablejs?pixel)
