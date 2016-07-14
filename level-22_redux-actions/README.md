# Level 22. 修改 Actions：讓它們做更簡單的事

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 22 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：修改原本 Flux 的 Action
2. 習得心法：
  1. [Redux] 了解 Action 是什麼，以及它的職責是什麼


## :triangular_flag_on_post: 主線任務

### 1. 了解這一關卡要實作的 Action 是什麼

> :bowtie:：建議你先閱讀 [秘笈 - 深入淺出 Redux](https://medium.com/p/7b08403c4957) 或是 [學習筆記 1]，再進行下去～！

### 2. 修改 actions/TodoActions.js

在 Level 14 中，我們完成了 Flux 的 Action Creator，現在我們要修正為 Redux 的 Action Creator：

```js
// 1. 為了讓程式能正常運作，你可以先保留 Flux 的 Action，
//    並且把 Redux 的 Action 獨立出來，再後面的關卡再覆蓋掉；
//    當然你也可以將原本 Flux 的 TodoActions 覆蓋成 Redux 的
window.App.TodoActions = { /* 略 */ };

window.App.TodoReduxActions = {
  createTodo(title) {
    // 2. 與 Flux 的 Action Creator 不同的是直接回傳 action 物件，不會將它遞給 Dispatcher
    return {
      type: ActionTypes.CREATE_TODO,
      title
    };
  },
  loadTodos() {
    // 3. 當我們遇到非同步的行為時，因為無法立即回傳 action 物件，我們可以回傳其他形式的 action，
    //    如這裡是回傳 thunk 函數，thunk 是將表達式封裝起來為了延遲調用的函數；
    //    Redux 提供一種方法叫 applyMiddleware，讓你的 Store 接收到這類型的 action 可以做額外的處理，
    //    如這裡是當 Store 接到 thunk 時才調用，並把 dispatch 函數遞進去。
    //    PS. 我們將會在下一章介紹如何使用 middleware 處理這類型的 action。
    return (dispatch) => {
      fetch('./todos.json')
        .then((response) => response.json())
        .then((todos) => dispatch({
          type: ActionTypes.LOAD_TODOS_SUCCESS,
          todos
        }));
    };
  },
  updateTodo(id, title)     { /* 略 */ },
  toggleTodo(id, completed) { /* 略 */ },
  deleteTodo(id)            { /* 略 */ }
};
```


## :book: 閱讀筆記

### 1. [Redux] 了解 Action 是什麼，以及它的職責是什麼

###### a. 還記得 Action 是什麼嗎？

Redux 的 Action 與 Flux 的 Action 一樣都是描述改變資料的行為。

###### b. 與 Flux 的 Action 有什麼不一樣？

Redux 的 Action 也是由兩個角色組成，Action Creator 和 action 物件；與 Flux 不同的是 Action Creator 不再將 action 物件遞給 Dispatcher，而只專心做一件事 - ***定義 action 物件並回傳***。

###### c. 範例：

```js
/** Action */
const loginActionCreator = (username, password) => {
  // 1. 建立定義 login 行為的 action 物件
  const action = {
    type: 'LOGIN',
    username,
    password
  };
  // 2. 將 action 物件回傳
  return action;
}

/** View */
// 所有會改變資料的動作都必須調用 Action Creator；
// 取得 action 物件後，再將它傳遞給 store
<button onClick={() => store.dispatch(loginActionCreator(this.state.username, this.state.password))}>login</button>
```


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-21_redux-store) ｜ [下一關. 加入 Middlewares：動態擴充 dispatch 行為](../level-23_redux-middlewares) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-22_redux-actions?pixel)
