# Level 23. 加入 Middlewares：動態擴充 dispatch 行為

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 23 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：加入 thunkMiddleware，讓 Store 可以處理非同步的 action
2. 獲得新技能：
  1. [Redux] 了解 applyMiddleware 的使用方法
3. 習得心法：
  1. [Redux] 了解 Middleware 是什麼，以及它用來幫助你什麼


## :triangular_flag_on_post: 主線任務

### 1. 先了解任務目標

在上一個關卡中，還記得我們尚未解的問題嗎？

```js
/** TodoActions.js */

window.App.TodoActions = {
  loadTodos() {
    return (dispatch) => {
      fetch('./todos.json')
        .then((response) => response.json())
        .then((todos) => dispatch({
          type: ActionTypes.LOAD_TODOS_SUCCESS,
          todos
        }));
    };
  },
  // ...
}
```

***我們在 loadTodos 回傳的不是 action 物件***，是一個 thunk 函數；因為 loadTodos 無法直接得到非同步回應的 action 物件並回傳，我們必須透過 thunk 得到 dispatch 函數後才執行非同步請求，並使用該函數將非同步回應的 action 物件遞給 Store。

所以，當我們取得回傳的 thunk 函數，並將它傳遞給 Store 時：

```js
store.dispatch(window.App.TodoActions.loadTodos());
```

我們遇到了以下問題：

1. Store 接到 action 會調用 reducer，但是 reducer 只接物件不接函數呀！
2. thunk 函數什麼時候該被調用呢？

### 2. 再瞭解 Middleware 到底是什麼

如果我們可以改變原本 store.dispatch 的行為，如：

1. 讓 Store 在調用 reducer 前，先判斷 action 是否為 thunk，是的話就調用
2. 讓 Store 在調用 reducer 前，先將 action 物件紀錄下來

像這類型需求，Redux 提供 Middleware 讓我們可以動態擴充 dispatch 行為來達到。

> :bowtie:：建議你先閱讀 [學習筆記 1]，再進行下去～！

### 3. 實作 thunkMiddleware

目前已經有第三方的 middleware - [redux-thunk](https://github.com/gaearon/redux-thunk) 可以支援 Store 處理 thunk，程式很簡短；那在這關卡，我們就自己實作：

```js
/** main.js */

const thunkMiddleware = ({ dispatch, getState }) => {
  return (next) => (action) => {
    // 1. 判斷 action 是否為 thunk function，是的話執行它，並將 dispatch 函數傳進去
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    // 2. 如果 action 不是 thunk，將 action 交給下一個 middleware
    return next(action);
  };
};

// ...
```

### 4. 使用 applyMiddleware 建立 Store 實例

```js
/** main.js */

const { ..., applyMiddleware } = Redux;

const thunkMiddleware = ...;

const store = createStore(
  composedReducer,
  // 1. 將 middleware 依序傳遞進 applyMiddleware
  // 2. 將回傳的 enhancer 函數傳遞給 createStore
  applyMiddleware(thunkMiddleware)
);

// ...
```


## :book: 閱讀筆記

### 1. [Redux] 了解 Middleware 是什麼，以及它用來幫助你什麼

###### 1. 為什麼需要有 Middleware？

在 Redux 中，如果要將 action 傳給 Store，Store 再幫你往下傳遞給 reducer 來改變狀態，你需要使用 `store.dispatch(action)` 這支 API。

我們知道 reducer 接收的 action 必須是一個物件，由 Action Creators 定義；但是，有時候 action 是非同步得到的，我們無法從 Action Creator 直接回傳物件交給 Store，那該怎麼手動 dispatch 呢？

```js
// 我們讓 Action Creator 回傳一個 function，
// 並且請 Redux 給我 dispatch function，
// 當 ajax 得到 response 我會自己呼叫 dispatch(action)
const login = (username, password) => {
  return (dispatch) => {
    fetch('./login')
      .then(() => dispatch({
        type: 'LOGIN',
        username,
        password
      }));
  }
};
```

而你回傳的 `(dispatch) => {...}` 就必須經過 Middleware 接手處理，才能讓 reducer 接收到 action 物件。

***Middleware 讓你可以在 action 傳遞到 reducer 前做一些事情***，例如：

1. 判斷 action 型別，做不一樣的事情
2. 紀錄應用程式中發生的所有 action

一支 Middleware 通常會只做一件事情，所以 Redux 會讓你可以根據需求組合及排序多支 Middlewares。

###### 2. Middleware 是什麼？

如果以程式來看 Middleware 做的事情：

```js
({ dispatch, getState }) => (nextDispatch) => dispatch'
```

***Middleware 的目的是在 dispatch 前做一些事情***，所以我們必須在最後回傳新的 dispatch' 函數，讓它：

1. 可以在做完事情後，調用下一個 Middleware 的 nextDispatch 處理
2. 可以根據不同狀況，重新調用 dispatch
3. 可以根據不同狀況，調用多次 dispatch 或 nextDispatch，或是直接吃掉該 action 而不往下傳遞

###### 3. 如何撰寫一支 Middleware？

Middleware 的格式為：

```js
var middleware = function({ dispatch, getState }) {
  // 1. Middleware 回傳 dispatchCreator
  return function dispatchCreator(nextDispatch) {
    // 2. dispatchCreator 回傳 dispatch
    return function dispatch(action) {
      // 在這層 dispatch 中：
      // 1. 你可以做 log，或是判斷 action 型別做對應的事情。
      // 2. 你可以判斷是否要將 action 傳給下一個 middleware：
      //    如果要，你可以使用 nextDispatch 傳遞；如果不要，你可以不做任何事。
      // 3. 你可以判斷是否要調用最上層的 dispatch 傳遞新的 action。
    }
  }
};
```

###### 4. 參考連結

- [Head First Redux Middleware](https://gist.github.com/shiningjason1989/43643b3607c6acf7b47f7afc52033e2c)
- [Redux 的 Middleware 詳解](http://huli.logdown.com/posts/294284-javascript-redux-middleware-details-tutorial)

### 2. [Redux] applyMiddleware 的使用方法

要讓 Store 加入 Middlewares 擴充 dispatch 函數，我們必須使用 applyMiddleware：

```js
const { createStore, applyMiddleware } = Redux;

const store = createStore(
  reducer,
  // 根據 middleware 的執行順序加入
  applyMiddleware(middleware1, middleware2)
);
```

###### 參考連結

- [createStore() | Redux](https://github.com/reactjs/redux/blob/master/docs/api/createStore.md)
- [applyMiddleware() | Redux](https://github.com/reactjs/redux/blob/master/docs/api/applyMiddleware.md)


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-22_redux-actions) ｜ [下一關. 讓 React 應用連結 Redux 系統](../level-24_react-redux) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-23_redux-middlewares?pixel)
