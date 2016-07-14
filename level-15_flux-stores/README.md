# Level 15. 完成 Stores：統一管理業務邏輯和資料

歡迎來到「24 小時，React 快速入門」系列教學 :mortar_board: Level 15 ～！
> :bowtie:：Wish you have a happy learning!


## :checkered_flag: 關卡目標

1. 完成主線任務：使用 TodoStore 儲存待辦資料和業務邏輯，完成 Flux 的 Store
2. 習得心法：
  1. [Flux] 了解 Store 是什麼，以及它的職責是什麼


## :triangular_flag_on_post: 主線任務

### 1. 了解這一關卡要實作的 Store 是什麼

> :bowtie:：建議你先閱讀 [秘笈 - 深入淺出 Flux](https://medium.com/p/44a48c320e11) 或是 [學習筆記 1]，再進行下去～！

### 2. 引入 EventEmitter

在 Store 中，需要提供 API 讓 View 註冊資料改變的監聽器(listener)，我們使用現有的事件管理模組 - [EventEmitter](https://github.com/Olical/EventEmitter)，讓它替我們負責監聽事件和觸發事件。

這一步，我們從 [[EventEmitter | cdnjs]](https://cdnjs.com/libraries/EventEmitter) 中，複製連結並貼到 index.html 中。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/EventEmitter/5.0.0/EventEmitter.js"></script>
```

我們大概會使用以下幾個 [API](https://github.com/Olical/EventEmitter/blob/master/docs/api.md)：

```js
const emitter = new EventEmitter();

// 1. 提供 View 註冊監聽器，使用 addListener(eventName, listener)
emitter.addListener('CHANGE', listener);

// 2. 提供 View 註銷監聽器，使用 removeListener(eventName, listener)
emitter.removeListener('CHANGE', listener);

// 3. 當資料改變觸發監聽器，使用 emit(eventName)
emitter.emit('CHANGE');
```

### 3. 完成 stores/TodoStore.js

再來我們就要完成 TodoStore.js，這支程式要負責：

1. 管理 todos 資料
2. 存放 create, update, toggle, delete 等改變 todos 的業務邏輯
3. 提供 View 註冊和註銷資料改變事件
4. 向 AppDispatcher 註冊 callback，callback 根據 ActionTypes(LOAD_TODOS_SUCCESS, CREATE_TODO, ...) 做不同的事
5. 當 todos 改變，觸發改變事件
6. 提供 getter API 回傳 todos

```js
const { ActionTypes, AppDispatcher } = window.App;

const CHANGE_EVENT = 'CHANGE';

const _emitter = new EventEmitter();

// 1. 管理 todos 資料
let _todos = [];

// 2. 將原本放在 TodoApp 中的業務邏輯，放到 Store 中；
//    或者你也可以開一支 utils/TodoUtils.js 另外放！
const _createTodo = (todos, title) => { /* 略 */ };
const _updateTodo = (todos, id, title) => { /* 略 */ };
const _toggleTodo = (todos, id, completed) => { /* 略 */ };
const _deleteTodo = (todos, id) => { /* 略 */ };

window.App.TodoStore = {
  // 6. 回傳 todos 陣列
  getAll() {
    return _todos;
  },

  // 3. 提供註冊改變事件的 API，並回傳註銷函數
  addChangeListener(callback) {
    _emitter.on(CHANGE_EVENT, callback);
    return () => _emitter.removeListener(CHANGE_EVENT, callback);
  },

  // 4. 向 AppDispatcher 註冊 callback，並根據 action.type 改變 todos
  //
  //    註：register() 會回傳 token，可以用在當 Store 有依賴關係，必須調整 dispatch 順序時。
  //    例：Dispatcher.waitFor([ token1, token2 ])
  dispatchToken: AppDispatcher.register((action) => {
    switch (action.type) {
      case ActionTypes.LOAD_TODOS_SUCCESS:
        _todos = action.todos;
        _emitter.emit(CHANGE_EVENT); // 5. 當資料改變，必須觸發事件
        break;
      case ActionTypes.CREATE_TODO:
        _todos = _createTodo(_todos, action.title);
        _emitter.emit(CHANGE_EVENT);
        break;
      case ActionTypes.UPDATE_TODO: /* 略 */
      case ActionTypes.TOGGLE_TODO: /* 略 */
      case ActionTypes.DELETE_TODO: /* 略 */
    }
  })
};
```

最後在 index.html 中加入 `<script src="./store/TodoStore.js"></script>`！

> :bowtie:：Store 是 Flux 中職責最重的角色，因此接下來會有 Redux 等其他實作改善這些問題！


## :book: 學習筆記

### 1. [Flux] 了解 Store 是什麼，以及它的職責是什麼

###### a. 還記得 Store 是什麼嗎？

Store 存放資料和業務邏輯，並且只提供 getter API 讓人取得資料。

###### b. 還記得 Store 的職責是什麼嗎？

在實務中，Store 會做以下幾件事情：

1. 管理資料狀態及改變狀態的業務邏輯
2. 向 Dispatcher 註冊 callback，傾聽應用程式的 action 物件
3. 提供註冊資料改變的 listener 給 View 註冊，並在狀態改變時觸發
4. 提供資料的 getter API

並且記得，Store 絕不會提供資料的 setter API，所有改變資料的行為都必須走 Flux 流程。


## :rocket:

｜ [主頁](../../../) ｜ [上一關](../level-14_flux-actions) ｜ [下一關. 完成 Controller View：讓元件同步資料狀態](../level-16_flux-controller-view) ｜

｜ :raising_hand: [我要提問](https://github.com/shiningjason1989/react-quick-tutorial/issues/new) ｜


![Analytics](https://shining-ga-beacon.appspot.com/UA-77436651-1/level-15_flux-stores?pixel)
