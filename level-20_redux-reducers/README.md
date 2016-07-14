# Level 20. 完成 Reducers：讓狀態的改變可預測化

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 20 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：將根據 action 改變 todos 的邏輯拉出，完成 Redux 的 Reducer
2. 習得心法：
  1. [Redux] 了解 Reducer 是什麼，以及它的職責是什麼


## :triangular_flag_on_post: 主線任務

### 1. 了解這一關卡要實作的 Reducer 是什麼

> :bowtie:：建議你先閱讀 [秘笈 - 深入淺出 Redux](https://medium.com/p/7b08403c4957) 或是 [學習筆記 1]，再進行下去～！

### 2. 建立 reducers/index.js

因為 Store 只接收一個 reducer 函數，而我們會將業務拆分 reducers，所以我們必須先把這些 reducers 根據狀態的 key 整併為一個物件（見學習筆記 2）：

```js
// 1. Store 只管理一個狀態
const state = {
  todos: ...
};

// 2. 將所有業務 reducers 根據狀態的 key 整併為一個物件
const reducers = {
  todos: todosReducer
};

// 3. 在下一章，我們會使用 combineReducers 將 reducers 物件轉成一個 reducer 函數，交給 Store
const reducer = combineReducers(reducers);
```

所以，在 reducers/index.js 中只需要：

```js
window.App.reducers = {};
```

最後，記得在 index.html 中加入 `./reducers/index.js` 連結！

### 3. 建立 reducers/todos.js

```js
const _createTodo = ...;
const _updateTodo = ...;
const _toggleTodo = ...;
const _deleteTodo = ...;

window.App.reducers.todos = (state = [], action) => {
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
};
```

最後，記得在 index.html 中加入 `./reducers/index.js` 連結！


## :book: 閱讀筆記

### 1. [Redux] 了解 Reducer 是什麼，以及它的職責是什麼

###### a. 還記得 Reducer 是什麼嗎？

Reducer 是一個實作狀態改變的函數；當輸入參數一樣時，輸出結果都會一樣，這幫助你做可預測的狀態管理。

###### b. 還記得 Reducer 的職責是什麼嗎？

Reducer 只做一件事，根據 action 物件和狀態，回傳新狀態：

```js
(state, action) => newState
```

### 2. [Redux] 組織多個業務狀態的 reducers

我們知道 Redux 的 Store 中只儲存一個狀態物件，其他業務資料會依附在該物件的屬性下，如同一個狀態樹：

```js
const state = {
  movies: ...,
  musics: ...,
  users: ...
};
```

如果我們把每一個業務狀態都交由一個 reducer 去處理：

```js
const moviesReducer = (action, movies) => newMovies;
const musicsReducer = (action, musics) => newMusics;
const usersReducer = (action, users) => newUsers;
```

我們知道 Redux 因為只有一個狀態，所以每次 Store 接收 action 只會調用一個 reducer，那麼要如何讓該 reducer 分別調用不同業務 reducer 來更新資料呢？

```js
// 1. 每個業務 reducer 根據狀態樹的 key 去對應起來
const reducers = {
  movies: moviesReducer,
  musics: musicsReducer,
  users: usersReducer
};

// 2. 使用 Redux 提供的 combineReducers 將 reducers 物件轉成一個 reducer 函數：
const reducer = combineReducers(reducers);
```

###### 延伸學習：combineReducers 做了什麼？

```js
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object
      .keys(reducers)
      .reducer((newState, key) => {
        newState[key] = reducers[key](state[key], action);
        return newState;
      }, {});
  }
};
```

> :bowtie:：如果你有任何的時間，建議去讀 [Source code](https://github.com/reactjs/redux/blob/master/src/combineReducers.js)；Redux 的 code 很簡單，我相信會對你大有益處！:100:


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-19_redux) ｜ [下一關. 完成 Store：Redux 的重要角色](../level-21_redux-store) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-20_redux-reducers?pixel)
