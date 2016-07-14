# Level 14. 完成 Actions：集中所有應用行為

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 14 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：規範 TodoApp 的所有行為，完成 Flux 的 Action
2. 習得心法：
  1. [Flux] 了解 Action 是什麼，以及它的職責是什麼


## :triangular_flag_on_post: 主線任務

### 1. 了解這一關卡要實作的 Action 是什麼

> :bowtie:：建議你先閱讀 [秘笈 - 深入淺出 Flux](https://medium.com/p/44a48c320e11) 或是 [學習筆記 1]，再回來這裡實作 Action！＾＾

### 2. 建立 constants/ActionTypes.js

在我們的應用程式中，會有五個***改變資料狀態的操作***：

1. AJAX 請求待辦資料
2. 建立待辦項目
3. 編輯待辦項目
4. 切換待伴狀態
5. 刪除待辦項目

上述動作都***必須規範在 Action*** 中，因此我們需要 ***type*** 來區分個別行為，所以建立五個常數：

```js
window.App.ActionTypes = {
  LOAD_TODOS_SUCCESS: 'LOAD_TODOS_SUCCESS',
  CREATE_TODO: 'CREATE_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO'
};
```

> :bowtie:：通常常數的 key/value 我們都給一樣的，你一定會覺得很麻煩，因此有一些第三方程式庫在解決這個問題，例如：[flux-constants](https://github.com/boichee/flux-constants)、[keyMirror](https://github.com/STRML/keyMirror) 等。

最後在 index.html 中加入 `<script src="./constants/ActionTypes.js"></script>`！

### 3. 建立 actions/TodoActions.js

根據上面五個動作，我們建立五個 Action Creator 函數，因為這五個動作都是歸屬於 Todo 的業務操作，因此我把它們放在 TodoActions 這一個檔案中：

```js
const {
  ActionTypes,
  AppDispatcher
} = window.App;

window.App.TodoActions = {
  createTodo(title) {
    // 1. 一個 Action Creator 函數做兩件事
    AppDispatcher.dispatch({         // a. 定義 action 物件，也就是 { type: ..., title: ... }
      type: ActionTypes.CREATE_TODO, // b. 將 action 物件傳遞給 Dispatcher，這裡用 .dispatch() 將 action 丟給 Dispacther
      title
    });
  },
  loadTodos() {
    // 2. 在非同步的狀態中，可以等待有 response 時，在丟 action 物件
    //
    //    註：同一個函數中，可以丟好幾個 action 物件，
    //    例如請求前丟一個，因為我們要將資料狀態改為 loading；
    //    請求成功或失敗，各丟不同的 action！
    fetch('./todos.json')
      .then((response) => response.json())
      .then((todos) => AppDispatcher.dispatch({
        type: ActionTypes.LOAD_TODOS_SUCCESS,
        todos
      }));
  },
  updateTodo(id, title)     { /* 略 */ },
  toggleTodo(id, completed) { /* 略 */ },
  deleteTodo(id)            { /* 略 */ }
};
```

最後，記得在 index.html 中加入 ./actions/TodoActions.js 的連結！


## :book: 學習筆記

### 1. [Flux] 了解 Action 是什麼，以及它的職責是什麼

###### a. 還記得 Action 是什麼嗎？

Action 規範所有改變資料的動作，讓你可以快速掌握整個 App 的行為。

###### b. 還記得 Action 的職責是什麼嗎？

在實務中，Action 會由兩個角色相輔相成，Action Creator 和 action 物件：

1. action 物件用來描述改變資料的動作，會有 type 屬性區分動作
2. Action Creator 是一個函數，只負責兩件事情：
  1. 定義 action 物件
  2. 將 action 物件傳遞給 Dispatcher

因此所有改變資料的操作，都必須調用相對應的 Action Creator 函數，讓它規範該操作，並將操作描述檔丟給 Dispatcher。

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
  // 2. 將 action 物件交給 dispatcher
  Dispatcher.dispatch(action);
}

/** View */
// 所有會改變資料的動作都必須調用 Action
<button onClick={() => loginActionCreator(this.state.username, this.state.password)}>login</button>
```


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-13_flux-dispatcher) ｜ [下一關. 完成 Stores：統一管理業務邏輯和資料](../level-15_flux-stores) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-14_flux-actions?pixel)
