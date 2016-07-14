# Level 18. 使用 Flux 提供的 Utils

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 18 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 主線目標：使用 FluxUtils 改寫 TodoApp
2. 獲得新技能：
  1. [facebook/flux] 練習 FluxUtils 提供的 API
3. 習得心法：
  1. [React Pattern] 複習 Container component 的功用
  2. [Flux] 了解 Flux 可能會產生的問題，和解決方式


## :triangular_flag_on_post: 主線任務

### 1. 了解本關的任務內容

> :bowtie:：本關卡比較傾向支線關卡，我們將使用 Facebook 提供的 FluxUtils 改寫應用，因此你可以直接跳往下一關 Redux！不過，在這個關卡中，***你可以複習到 Container component***；也可以***了解我們自己寫的 Store 出了什麼問題***，因此 FB 提供了什麼解決方案，未來的 Redux 也將會提供類似的方案！

### 2. 引入 Facebook 的 FluxUtils

從 [rawgit](https://rawgit.com/) 中，貼上 [FluxUtils.js](https://github.com/facebook/flux/blob/master/dist/FluxUtils.js) 的連結，即可取得 CDN 連結：

```html
<script src="https://cdn.rawgit.com/facebook/flux/master/dist/FluxUtils.js"></script>
```

### 3. 使用 FluxUtils 的 ReduceStore 改寫 TodoStore

在前幾個關卡中，我們實作的 TodoStore 比起 AppDispatcher, TodoActions 職責重了許多：

1. 需要管理業務資料的改變邏輯
2. 需要提供 API 讓 View 註冊及註銷資料改變的監聽器
3. 需要提供資料的 getter API 讓 View 取得資料
4. 需要向 Dispatcher 註冊 callback 函數
5. 需要手動觸發資料改變的監聽器

因此官方提供三個 Utility classes ([Store](https://facebook.github.io/flux/docs/flux-utils.html#store), [ReduceStore](https://facebook.github.io/flux/docs/flux-utils.html#reducestore-t), [MapStore](https://facebook.github.io/flux/docs/flux-utils.html#mapstore-k-v)) 幫助你可以不用每刻一支業務資料的 Store 就必須做上面那些事情。

在這次的改寫中，我們使用 ReduceStore，它幫你實作了原本第 2 ～ 5 項的工作，你只需要專注在「***將舊狀態根據 action 改成新狀態***」這個邏輯上即可：

```js
const { ReduceStore } = FluxUtils;

// 略...

class TodoStore extends ReduceStore {
  // 1. 回傳初始狀態
  getInitialState() {
    return [];
  }

  // 2. 實作 reduce()，該函數提供你舊狀態及 action，你必須回傳新狀態回去
  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.LOAD_TODOS_SUCCESS:
        return action.todos;
      case ActionTypes.CREATE_TODO:
        return _createTodo(state, action.title);
      case ActionTypes.UPDATE_TODO:
        return _updateTodo(state, action.id, action.title);
      case ActionTypes.TOGGLE_TODO:
        return _toggleTodo(state, action.id, action.completed);
      case ActionTypes.DELETE_TODO:
        return _deleteTodo(state, action.id);
      default:
        return state;
    }
  }
}

// 3. 建立 TodoStore 實例，必須將 Dispatcher 遞進去
window.App.TodoStore = new TodoStore(AppDispatcher);
```

### 4. 將 TodoStore 中的狀態改寫為 immutable

在改寫前，我們先來了解我們為什麼要使用 immutable，immutable 又是什麼（immutable 翻成中文為***不可變的***）。

###### a. 為什麼要使用 immutable

在 ReduceStore 中，它提供了一個 API：

```js
class ReduceStore {
  areEqual(state1, state2) {
    return state1 === state2;
  }
  // ...
}
```

`areEqual()` 會在每次 action 被 dispatch 進來，調用 `reduce(state, action)` 取得新狀態後被呼叫；它用來***判斷資料是否有變更，如果有則觸發改變資料的事件通知 View***。

```js
新狀態 = reduce(舊狀態, action);
是否要觸發事件 = areEqual(舊狀態, 新狀態);
```

你可以覆寫 `areEqual()` 來判斷狀態是否相等的邏輯；回到 TodoStore，在我們沒有覆寫的情況下，它是永遠回傳 `true` 的，因此 View 提供的監聽器永遠都不會被觸發。

***為什麼？***請仔細看 `_createTodo`, `_updateTodo`, `_toggleTodo`, `_deleteTodo` 這幾支函數，每當 todos 被送進去，我們針對需求修改了陣列中的資料，但是回傳的都是原本的 todos，因此跑到 areEqual 回傳的永遠是 true。

***這時候，immutable 就派上用場了***；每次改變資料，我們必須回傳新的陣列，且絕對不能改變舊陣列中的資料！

> :bowtie:：如果你想了解更多 immutable 的實作，可以參考 [immutablejs](https://facebook.github.io/immutable-js/)，我們也將會在 Level 24 中再次介紹它。

###### b. 實作 immutable

```js
const _createTodo = (todos, title) => {
  // 1. 每次新增項目，就回傳新陣列
  return [
    ...todos,
    {
      id: todos[todos.length - 1].id + 1,
      title,
      completed: false
    }
  ];
};

const _updateTodo = (todos, id, title) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx === -1) return todos;

  // 2. 每次修改項目，就回傳新陣列
  const newTodos = [ ...todos ];
  newTodos[idx] = {
    ...todos[idx],
    title
  };
  return newTodos;
};

const _toggleTodo = (todos, id, completed) => {
  // 3. 每次切換狀態，就回傳新陣列；略...
  return newTodos;
};

const _deleteTodo = (todos, id) => {
  // 4. 每次刪除項目，就回傳新陣列；略...
  return newTodos;
};
```

### 5. 使用 FluxUtils 的 Container 改寫 Container components

FluxUtils 也提供我們 [Container API](https://facebook.github.io/flux/docs/flux-utils.html#container)，因為以前我們每刻一個 Container component 都必須手動向 Store 註冊及註銷監聽器，因此它幫助我們減輕這個負擔：

###### a. 修改 TodoHeaderContainer

```js
const { Container } = FluxUtils;

class TodoHeaderContainer extends React.Component {
  static getStores() {
    return [ TodoStore ]; // 1. 向 Store 註冊及註銷監聽器
  }

  static calculateState(prevState) {
    return {
      todos: TodoStore.getState(), // 2. 同步 Store 中的狀態至元件的 state 中
    };
  }

  render() { /* 略 */ }
}

// 3. 使用 create() 建立 Container component
window.App.TodoHeaderContainer = Container.create(TodoHeaderContainer);
```

###### a. 修改 TodoListContainer

```js
class TodoListContainer extends React.Component {
  static getStores() {
    return [ TodoStore ];
  }

  static calculateState(prevState) {
    return {
      todos: TodoStore.getState(),
    };
  }

  render() { /* 略 */ }
}

window.App.TodoListContainer = Container.create(TodoListContainer);
```


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-17_container-pattern) ｜ [下一關. 深入淺出 Redux](../level-19_redux) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-18_flux-utils?pixel)
